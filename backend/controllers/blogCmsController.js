import mongoose from "mongoose";
import { createHmac, timingSafeEqual } from "node:crypto";
import Blog from "../models/Blog.js";
import BlogRevision from "../models/BlogRevision.js";
import {
  cleanBlogInput,
  editableFields,
  validateBlog,
} from "../utils/blogValidation.js";
import {
  liveBlogUrl,
  blogRobots,
  buildBlogSchema,
} from "../../shared/blogSeo.mjs";
import { parseFragment } from "parse5";
import { verifyBlogHtml } from "../utils/blogVerification.js";

const object = (doc) => (doc.toObject ? doc.toObject() : doc);
export const editableBlog = (doc) => {
  const blog = object(doc);
  const draft = blog.draftContent || {};
  const view = { ...blog, ...draft };
  const inlineImages = [];
  const visit = (node) => {
    if (node.tagName === "img") {
      const attributes = Object.fromEntries(
        node.attrs.map((attr) => [attr.name, attr.value]),
      );
      inlineImages.push({
        media_id: attributes["data-media-id"] || null,
        url: attributes.src,
        alt: attributes.alt || "",
        caption: attributes.title || null,
      });
    }
    (node.childNodes || []).forEach(visit);
  };
  visit(parseFragment(view.content || ""));
  return {
    ...view,
    id: String(blog._id),
    revision: blog.revision || 0,
    liveStatus: blog.status,
    hasDraft: Boolean(blog.draftContent),
    live_url:
      blog.published && blog.status === "published"
        ? liveBlogUrl(blog.slug)
        : null,
    content_html: view.content,
    excerpt: view.shortDescription,
    primary_keyword: view.primaryKeyword,
    meta_title: view.metaTitle,
    meta_description: view.metaDescription,
    canonical_url: view.canonicalUrl,
    robots: blogRobots(view),
    featured_image: {
      media_id: view.imageMediaId || null,
      url: view.image || "",
      alt: view.imageAlt || "",
    },
    inline_images: inlineImages,
    og: {
      title: view.ogTitle,
      description: view.ogDescription,
      image: view.ogImage || view.image,
    },
    twitter: {
      title: view.twitterTitle,
      description: view.twitterDescription,
      image: view.twitterImage || view.ogImage || view.image,
    },
    author: {
      name: view.authorName,
      profile_url: view.authorProfileUrl,
      credentials: view.authorCredentials,
    },
    published_at: view.publishedDate,
    reviewed_at: view.reviewedDate,
    updated_at: blog.updatedAt,
    medical_disclaimer: view.medicalDisclaimer,
    schema_enabled: view.schemaEnabled !== false,
  };
};
const fail = (status, message, validation) =>
  Object.assign(new Error(message), { status, validation });
const responseError = (res, error) => {
  if (error.code === 11000)
    return res
      .status(409)
      .json({
        success: false,
        message: "A blog with this slug already exists.",
      });
  if (error.name === "ValidationError")
    return res.status(422).json({ success: false, message: error.message });
  return res
    .status(error.status || 500)
    .json({
      success: false,
      message: error.status
        ? error.message
        : "Blog operation failed. No partial revision was committed.",
      ...(error.validation ? { validation: error.validation } : {}),
    });
};
const ensureId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw fail(400, "Invalid blog ID.");
};
const snapshotOf = (blog) =>
  Object.fromEntries(
    [...editableFields, "modifiedDate", "draftContent"]
      .filter((key) => blog[key] !== undefined)
      .map((key) => [key, blog[key]]),
  );
export const writeBlog = async ({
  id,
  input,
  actorId,
  action = "update",
  restoreId,
}) => {
  if (id) ensureId(id);
  const session = await mongoose.startSession();
  let saved, validation;
  try {
    await session.withTransaction(async () => {
      const existing = id ? await Blog.findById(id).session(session) : null;
      if (id && !existing) throw fail(404, "Blog not found.");
      if (
        existing &&
        input.revision !== undefined &&
        Number(input.revision) !== (existing.revision || 0)
      )
        throw fail(
          409,
          "This post changed since it was opened. Reload before saving.",
        );
      let fields = cleanBlogInput(input);
      if (restoreId) {
        ensureId(restoreId);
        const revision = await BlogRevision.findOne({
          _id: restoreId,
          blogId: id,
        })
          .session(session)
          .lean();
        if (!revision) throw fail(404, "Revision not found for this blog.");
        fields = cleanBlogInput({
          ...revision.snapshot,
          ...Object.fromEntries(
            ["date", "publishedDate", "reviewedDate"]
              .filter((key) => revision.snapshot[key])
              .map((key) => [
                key,
                new Date(revision.snapshot[key]).toISOString(),
              ]),
          ),
        });
      }
      const base = existing
        ? {
            ...object(existing),
            ...(action === "publish" ? existing.draftContent || {} : {}),
          }
        : {};
      let status =
        action === "publish"
          ? "published"
          : action === "unpublish"
            ? "draft"
            : fields.status || base.status || "draft";
      if (!id) status = "draft";
      if (input.published === false && action !== "publish") status = "draft";
      const candidate = {
        ...base,
        ...fields,
        status,
        published: status === "published",
      };
      candidate.canonicalUrl ||= liveBlogUrl(candidate.slug || "");
      if (
        existing &&
        candidate.slug !== existing.slug &&
        candidate.canonicalUrl === liveBlogUrl(existing.slug)
      )
        candidate.canonicalUrl = liveBlogUrl(candidate.slug);
      const duplicate = await Blog.findOne({
        $or: [{ slug: candidate.slug }, { previousSlugs: candidate.slug }],
        ...(id ? { _id: { $ne: id } } : {}),
      })
        .session(session)
        .lean();
      if (duplicate)
        throw fail(
          409,
          "A blog with this exact slug already exists. Open that post instead.",
        );
      if (
        !id &&
        (await Blog.exists({ title: candidate.title }).session(session))
      )
        throw fail(
          409,
          "A blog with this exact title exists. Open that post instead.",
        );
      validation = validateBlog(candidate);
      // Drafts may be incomplete; identity and state must still be safe.
      const draftErrors = validation.errors.filter((error) =>
        /Slug|Canonical|publication state/.test(error),
      );
      if (
        (status === "published" && validation.errors.length) ||
        (status !== "published" && draftErrors.length)
      )
        throw fail(422, "Blog validation failed.", {
          ...validation,
          errors: status === "published" ? validation.errors : draftErrors,
        });
      const blog = existing || new Blog();
      let previousRevisionId = blog.currentRevisionId;
      if (existing && !previousRevisionId) {
        previousRevisionId = new mongoose.Types.ObjectId();
        await BlogRevision.create(
          [
            {
              _id: previousRevisionId,
              blogId: blog._id,
              number: blog.revision || 0,
              snapshot: snapshotOf(object(blog)),
              actorId,
              action: "baseline",
            },
          ],
          { session },
        );
      }
      if (
        existing?.status === "published" &&
        status === "draft" &&
        action !== "unpublish" &&
        !restoreId
      ) {
        blog.draftContent = Object.fromEntries(
          editableFields
            .filter((key) => candidate[key] !== undefined)
            .map((key) => [key, candidate[key]]),
        );
      } else {
        if (existing?.publishedDate && existing.slug !== candidate.slug) {
          blog.previousSlugs = [...new Set([...(existing.previousSlugs || []), existing.slug])].filter(slug => slug !== candidate.slug);
        }
        const nextFields = Object.fromEntries(
          editableFields
            .filter((key) => candidate[key] !== undefined)
            .map((key) => [key, candidate[key]]),
        );
        if (candidate.published)
          nextFields.publishedDate =
            existing?.publishedDate || candidate.publishedDate || new Date();
        blog.set({
          ...nextFields,
          draftContent: undefined,
          modifiedDate: new Date(),
        });
      }
      blog.revision = (existing?.revision || 0) + 1;
      const revisionId = new mongoose.Types.ObjectId();
      blog.currentRevisionId = revisionId;
      await blog.save({ session });
      await BlogRevision.create(
        [
          {
            _id: revisionId,
            blogId: blog._id,
            number: blog.revision,
            snapshot: snapshotOf(object(blog)),
            actorId,
            action: restoreId ? "rollback" : action,
            previousRevisionId,
            restoredRevisionId: restoreId,
          },
        ],
        { session },
      );
      saved = object(blog);
    });
    return { saved, validation };
  } finally {
    await session.endSession();
  }
};
const success = (result) => ({
  success: true,
  blog: editableBlog(result.saved),
  post_id: String(result.saved._id),
  slug: result.saved.slug,
  status: result.saved.status,
  live_url: result.saved.published ? liveBlogUrl(result.saved.slug) : null,
  published_at: result.saved.publishedDate || null,
  updated_at: result.saved.updatedAt,
  revision_id: String(result.saved.currentRevisionId),
  validation: result.validation,
  verification: {
    state: "pending",
    message: "Verify the public URL before marking the publication complete.",
  },
});
export const saveBlog = (action) => async (req, res) => {
  try {
    const result = await writeBlog({
      id: req.params.id,
      input: req.body,
      actorId: req.cmsSession.userId,
      action,
    });
    res.status(req.params.id ? 200 : 201).json(success(result));
  } catch (error) {
    responseError(res, error);
  }
};
export const readBlog = async (req, res) => {
  try {
    ensureId(req.params.id);
    const blog = await Blog.findById(req.params.id).lean();
    if (!blog) throw fail(404, "Blog not found.");
    res.set("Cache-Control", "no-store").json(editableBlog(blog));
  } catch (error) {
    responseError(res, error);
  }
};
export const findBlogs = async (req, res) => {
  try {
    const filter = {};
    if (req.query.id) {
      ensureId(req.query.id);
      filter._id = req.query.id;
    }
    if (req.query.slug) filter.slug = String(req.query.slug);
    if (req.query.title) filter.title = String(req.query.title);
    if (req.query.q) {
      const escaped = String(req.query.q)
        .slice(0, 200)
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { title: new RegExp(escaped, "i") },
        { slug: new RegExp(escaped, "i") },
      ];
    }
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1),
      limit = 25;
    const blogs = await Blog.find(filter)
      .select("-image -content -ogImage -twitterImage -draftContent")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const total = await Blog.countDocuments(filter);
    res
      .set("Cache-Control", "no-store")
      .json({
        blogs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.max(1, Math.ceil(total / limit)),
        },
      });
  } catch (error) {
    responseError(res, error);
  }
};
export const listRevisions = async (req, res) => {
  try {
    ensureId(req.params.id);
    const revisions = await BlogRevision.find({ blogId: req.params.id })
      .select("-snapshot")
      .sort({ number: -1 })
      .lean();
    res.set("Cache-Control", "no-store").json({ revisions });
  } catch (error) {
    responseError(res, error);
  }
};
export const rollbackBlog = async (req, res) => {
  try {
    res.json(
      success(
        await writeBlog({
          id: req.params.id,
          input: req.body,
          actorId: req.cmsSession.userId,
          restoreId: req.params.revisionId,
        }),
      ),
    );
  } catch (error) {
    responseError(res, error);
  }
};
const previewSignature = (id, revision) => {
  if (
    !process.env.CMS_PREVIEW_SECRET ||
    process.env.CMS_PREVIEW_SECRET.length < 32
  )
    throw fail(
      503,
      "A CMS_PREVIEW_SECRET of at least 32 characters must be configured.",
    );
  return createHmac("sha256", process.env.CMS_PREVIEW_SECRET)
    .update(`${id}.${revision}`)
    .digest("hex");
};
export const verifyBlog = async (req, res) => {
  try {
    ensureId(req.params.id);
    const blog = await Blog.findById(req.params.id)
      .select("-draftContent")
      .lean();
    if (!blog || blog.status !== "published" || !blog.published)
      throw fail(422, "Publish the blog before verifying its live URL.");
    const response = await fetch(liveBlogUrl(blog.slug), {
      redirect: "manual",
      signal: AbortSignal.timeout(20000),
      headers: { Accept: "text/html", "Cache-Control": "no-cache" },
    });
    const errors =
      response.status === 200
        ? verifyBlogHtml(await response.text(), blog)
        : [
            `Live URL returned ${response.status}; expected 200 without redirects.`,
          ];
    const verification = {
      state: errors.length ? "failed" : "verified",
      revision: blog.revision,
      actorId: req.cmsSession.userId,
      checkedAt: new Date(),
      errors,
    };
    const updated = await Blog.updateOne(
      { _id: blog._id, revision: blog.revision },
      { $set: { lastVerification: verification } },
      { timestamps: false },
    );
    if (!updated.matchedCount)
      throw fail(409, "Blog changed while live verification was running.");
    res
      .status(errors.length ? 422 : 200)
      .json({
        success: !errors.length,
        verification,
        message: errors.length
          ? "Live verification failed."
          : "Live article matches the saved revision.",
      });
  } catch (error) {
    responseError(res, error);
  }
};
export const readPreview = async (token) => {
  const [id, revision, signature] = String(token).split(".");
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !/^\d+$/.test(revision || "") ||
    !/^[a-f0-9]{64}$/.test(signature || "")
  )
    return null;
  const expected = previewSignature(id, revision);
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected)))
    return null;
  const blog = await Blog.findById(id).lean();
  if (!blog || (blog.revision || 0) !== Number(revision)) return null;
  return { ...blog, ...(blog.draftContent || {}), noIndex: true };
};
export const previewBlog = async (req, res) => {
  try {
    ensureId(req.params.id);
    const blog = await Blog.findById(req.params.id).lean();
    if (!blog) throw fail(404, "Blog not found.");
    const preview = { ...blog, ...(blog.draftContent || {}) };
    const token = `${blog._id}.${blog.revision || 0}.${previewSignature(String(blog._id), blog.revision || 0)}`;
    res
      .set({ "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" })
      .json({
        success: true,
        preview_url: `${liveBlogUrl(preview.slug)}?preview=${token}`,
        validation: validateBlog(preview),
        schema: buildBlogSchema(preview),
      });
  } catch (error) {
    responseError(res, error);
  }
};
