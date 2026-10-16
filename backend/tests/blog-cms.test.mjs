import test from "node:test";
import assert from "node:assert/strict";
import { normalizeContent, validateBlog } from "../utils/blogValidation.js";

test("editor formatting survives sanitization without allowing unsafe CSS", () => {
  const html = normalizeContent('<p style="text-align:center;position:fixed"><span style="font-size:24px;color:#dc2626;background-image:url(https://invalid.example/a)"><u><s>Formatted text</s></u></span><mark data-color="#ffff00" style="background-color:rgb(255,255,0)">Highlight</mark></p><a href="https://example.com" target="_blank"><img src="/uploads/example.png" alt="Image"></a>');
  assert.match(html, /text-align:center/);
  assert.match(html, /font-size:24px/);
  assert.match(html, /color:#dc2626/);
  assert.match(html, /<u><s>Formatted text<\/s><\/u>/);
  assert.match(html, /background-color:rgb\(255,255,0\)/);
  assert.match(html, /noopener noreferrer/);
  assert.doesNotMatch(html, /position|background-image|invalid.example/);
});
import { buildBlogSchema } from "../../shared/blogSeo.mjs";
import { createEnvironment } from "./environment.mjs";
import Blog from "../models/Blog.js";
import BlogRevision from "../models/BlogRevision.js";
import { readPreview } from "../controllers/blogCmsController.js";

test("semantic formatting preserves clinical text and neutralizes executable HTML", () => {
  const html = normalizeContent(
    '<p>## Assessment</p><p>- First point</p><p>Internal linking: add 3-5 contextual links...</p><p><b>Care</b> <em>plan</em> stays unchanged.</p><script>alert(1)</script><img src="x" onerror="alert(1)"><a href="javascript:alert(1)">Evidence</a>',
  );
  assert.match(html, /<h2>Assessment<\/h2>/);
  assert.match(html, /<ul>\s*<li>First point<\/li>\s*<\/ul>/);
  assert.match(html, /<b>Care<\/b> <em>plan<\/em> stays unchanged\./);
  assert.doesNotMatch(html, /Internal linking|<script|onerror|javascript:/);
});
test("warnings never force artificial links or image counts; invalid publication is blocked", () => {
  const result = validateBlog({
    title: "Care",
    slug: "care",
    status: "published",
    content: "<h2>Assessment</h2><p>Plain clinical text.</p>",
  });
  assert.equal(result.errors.length, 0);
  assert.ok(result.warnings.length);
  assert.equal(result.info.internalLinks, 0);
  assert.ok(
    validateBlog({ title: "", slug: "../x", content: "", status: "broken" })
      .errors.length >= 3,
  );
});
test("schema contains only the current article and visible FAQ, without fabricated claims", () => {
  const schema = buildBlogSchema({
    title: "Care",
    slug: "care",
    publishedDate: "2026-10-13",
    modifiedDate: "2026-10-13",
    category: "Child development",
    authorName: "Author",
    authorProfileUrl: "https://drankushgarg.in/about",
    image: "https://drankushgarg.in/care.webp",
    faq: [],
  });
  assert.equal(schema["@graph"].length, 1);
  assert.equal(
    schema["@graph"][0].mainEntityOfPage["@id"],
    "https://drankushgarg.in/blog/care",
  );
  assert.doesNotMatch(
    JSON.stringify(schema),
    /AggregateRating|Review|example.com\/college/,
  );
});
test(
  "scoped CMS lifecycle, snapshots, previews, security and transaction rollback",
  { timeout: 240000 },
  async (t) => {
    const env = await createEnvironment();
    try {
      await t.test(
        "anonymous writes and admin reads fail; scoped login cannot read appointments",
        async () => {
          assert.equal(
            (
              await env.request("/api/blogs", {
                method: "POST",
                data: { title: "Unauthorized" },
                auth: false,
              })
            ).status,
            401,
          );
          assert.equal(
            (await env.request("/api/blogs?admin=true", { auth: false }))
              .status,
            401,
          );
          assert.equal((await env.login()).status, 200);
          assert.equal(
            (await env.request("/api/appointments/admin/all")).status,
            403,
          );
          assert.equal(
            (
              await env.request("/api/author-profile", {
                method: "PUT",
                data: { name: "Changed" },
              })
            ).status,
            403,
          );
        },
      );
      let id, revision, publishedRevisionId, publishedAt;
      await t.test(
        "create remains draft, preview uses the exact template, publish has deterministic output",
        async () => {
          const response = await env.request("/api/blogs", {
            method: "POST",
            data: {
              title: "Clinical care test",
              slug: "clinical-care-test",
              status: "published",
              content:
                "<p>## Assessment</p><p>Clinical statement unchanged.</p>",
              metaTitle: "Exact meta title",
              metaDescription: "Exact description",
              authorName: "Dr. Ankush Garg",
            },
          });
          assert.equal(response.status, 201);
          assert.equal(response.json.status, "draft");
          id = response.json.post_id;
          revision = response.json.blog.revision;
          assert.equal(
            (
              await env.request("/api/blogs/clinical-care-test", {
                auth: false,
              })
            ).status,
            404,
          );
          const preview = await env.request(`/api/blogs/cms/${id}/preview`, {
            method: "POST",
            data: {},
          });
          assert.equal(preview.status, 200);
          const token = new URL(preview.json.preview_url).searchParams.get(
            "preview",
          );
          assert.match((await readPreview(token)).content, /<h2>Assessment/);
          const rendered = await env.request(
            `/blog/clinical-care-test?preview=${token}`,
            { auth: false },
          );
          assert.equal(rendered.status, 200);
          assert.match(rendered.headers.get("x-robots-tag"), /noindex/);
          assert.match(rendered.text, /Clinical statement unchanged/);
          const publish = await env.request(`/api/blogs/cms/${id}/publish`, {
            method: "POST",
            data: { revision },
          });
          assert.equal(publish.status, 200);
          assert.equal(
            publish.json.live_url,
            "https://drankushgarg.in/blog/clinical-care-test",
          );
          revision = publish.json.blog.revision;
          publishedRevisionId = publish.json.revision_id;
          publishedAt = publish.json.published_at;
          const raw = await env.request("/blog/clinical-care-test", {
            auth: false,
          });
          assert.equal(raw.status, 200);
          assert.equal([...raw.text.matchAll(/<h1\b/g)].length, 1);
          assert.equal([...raw.text.matchAll(/name="description"/g)].length, 1);
          assert.match(raw.text, /<title[^>]*>Exact meta title<\/title>/);
          assert.match(raw.text, /<h2[^>]*>Assessment<\/h2>/);
          assert.equal(
            (await env.request("/blog/not-real", { auth: false })).status,
            404,
          );
        },
      );
      await t.test(
        "draft edits stay private, publish preserves date, exact lookup and duplicates work",
        async () => {
          const draft = await env.request(`/api/blogs/cms/${id}`, {
            method: "PATCH",
            data: {
              revision,
              status: "draft",
              content: "<p>Private revised content.</p>",
            },
          });
          assert.equal(draft.status, 200);
          revision = draft.json.blog.revision;
          const publicRecord = await env.request(
            "/api/blogs/clinical-care-test",
            { auth: false },
          );
          assert.doesNotMatch(
            publicRecord.text,
            /Private revised|draftContent/,
          );
          const privateRecord = await env.request(`/api/blogs/cms/${id}`);
          assert.match(privateRecord.json.content, /Private revised/);
          const publish = await env.request(`/api/blogs/cms/${id}/publish`, {
            method: "POST",
            data: { revision },
          });
          assert.equal(publish.status, 200);
          revision = publish.json.blog.revision;
          assert.equal(publish.json.published_at, publishedAt);
          assert.equal(
            (await env.request("/api/blogs/cms?slug=clinical-care-test")).json
              .blogs.length,
            1,
          );
          assert.equal(
            (await env.request("/api/blogs/cms?title=Clinical%20care%20test"))
              .json.blogs.length,
            1,
          );
          assert.equal(
            (
              await env.request("/api/blogs", {
                method: "POST",
                data: { title: "Other", slug: "clinical-care-test" },
              })
            ).status,
            409,
          );
          assert.equal(
            (
              await env.request(`/api/blogs/cms/${id}`, {
                method: "PATCH",
                data: { revision: 1, content: "<p>Stale</p>" },
              })
            ).status,
            409,
          );
        },
      );
      await t.test(
        "rollback creates an audited revision and failed revision writes commit nothing",
        async () => {
          const rollback = await env.request(
            `/api/blogs/cms/${id}/rollback/${publishedRevisionId}`,
            { method: "POST", data: { revision } },
          );
          assert.equal(rollback.status, 200);
          revision = rollback.json.blog.revision;
          assert.match(
            rollback.json.blog.content,
            /Clinical statement unchanged/,
          );
          const history = await env.request(`/api/blogs/cms/${id}/revisions`);
          assert.equal(history.json.revisions[0].action, "rollback");
          assert.equal(history.json.revisions[0].actorId, "fixture-editor");
          const create = BlogRevision.create;
          try {
            BlogRevision.create = async () => {
              throw new Error("Injected failure");
            };
            assert.equal(
              (
                await env.request(`/api/blogs/cms/${id}`, {
                  method: "PATCH",
                  data: {
                    revision,
                    status: "published",
                    content: "<p>Must not commit</p>",
                  },
                })
              ).status,
              500,
            );
          } finally {
            BlogRevision.create = create;
          }
          const record = await Blog.findById(id).lean();
          assert.equal(record.revision, revision);
          assert.doesNotMatch(record.content, /Must not commit/);
        },
      );
      await t.test(
        "live verification only succeeds against the exact published revision",
        async () => {
          const raw = await env.request("/blog/clinical-care-test", {
            auth: false,
          });
          const original = globalThis.fetch;
          try {
            globalThis.fetch = async (url, options) =>
              String(url).startsWith("https://drankushgarg.in/")
                ? new Response(raw.text, { status: 200 })
                : original(url, options);
            const verified = await env.request(`/api/blogs/cms/${id}/verify`, {
              method: "POST",
              data: {},
            });
            assert.equal(verified.status, 200);
            assert.equal(verified.json.verification.state, "verified");
            globalThis.fetch = async (url, options) =>
              String(url).startsWith("https://drankushgarg.in/")
                ? new Response("<h1>Another article</h1>", { status: 200 })
                : original(url, options);
            const invalid = await env.request(`/api/blogs/cms/${id}/verify`, {
              method: "POST",
              data: {},
            });
            assert.equal(invalid.status, 422);
            assert.equal(invalid.json.verification.state, "failed");
          } finally {
            globalThis.fetch = original;
          }
        },
      );
      await t.test("published slugs can be edited with canonical sync and permanent redirects", async () => {
        const created = await env.request("/api/blogs", { method: "POST", data: {
          title: "Slug editing fixture", slug: "slug-edit-original", content: "<p>Editorial test content.</p>",
        } });
        assert.equal(created.status, 201);
        const postId = created.json.post_id;
        assert.equal((await env.request(`/api/blogs/cms/${postId}/publish`, { method: "POST", data: {} })).status, 200);
        const draft = await env.request(`/api/blogs/cms/${postId}`, { method: "PATCH", data: { slug: "slug-edit-renamed", status: "draft" } });
        assert.equal(draft.status, 200, JSON.stringify(draft.json));
        assert.equal(draft.json.blog.slug, "slug-edit-renamed");
        assert.equal(draft.json.blog.canonicalUrl, "https://drankushgarg.in/blog/slug-edit-renamed");
        assert.equal((await env.request("/blog/slug-edit-original", { auth: false })).status, 200);
        assert.equal((await env.request("/blog/slug-edit-renamed", { auth: false })).status, 404);
        const published = await env.request(`/api/blogs/cms/${postId}/publish`, { method: "POST", data: {} });
        assert.equal(published.status, 200, JSON.stringify(published.json));
        const redirect = await fetch(`${env.origin}/blog/slug-edit-original`, { redirect: "manual" });
        assert.equal(redirect.status, 301);
        assert.equal(redirect.headers.get("location"), "/blog/slug-edit-renamed");
        assert.equal((await env.request("/blog/slug-edit-renamed", { auth: false })).status, 200);
        const conflict = await env.request("/api/blogs", { method: "POST", data: { title: "Cannot reuse old URL", slug: "slug-edit-original" } });
        assert.equal(conflict.status, 409);
        const invalid = await env.request(`/api/blogs/cms/${postId}`, { method: "PATCH", data: { slug: "Invalid Slug", status: "draft" } });
        assert.equal(invalid.status, 422);
      });
      await t.test(
        "malformed media and invalid publish fail; session revocation works",
        async () => {
          const form = new FormData();
          form.append(
            "image",
            new Blob(["executable"], { type: "image/png" }),
            "bad.png",
          );
          assert.equal(
            (await env.request("/api/media", { method: "POST", body: form }))
              .status,
            422,
          );
          assert.equal(
            (
              await env.request(`/api/blogs/cms/${id}`, {
                method: "PATCH",
                data: { revision, status: "published", content: "" },
              })
            ).status,
            422,
          );
          assert.equal(
            (
              await env.request("/api/cms-auth/logout", {
                method: "POST",
                data: {},
              })
            ).status,
            200,
          );
          assert.equal((await env.request(`/api/blogs/cms/${id}`)).status, 401);
        },
      );
    } finally {
      await env.cleanup();
    }
  },
);
