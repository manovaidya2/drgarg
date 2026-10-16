import sanitizeHtml from "sanitize-html";
import { parseFragment, serialize } from "parse5";
import { marked } from "marked";
import { SITE_URL, liveBlogUrl } from "../../shared/blogSeo.mjs";

const textOf = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes || []).map(textOf).join("");
export const normalizeContent = (input = "") => {
  let html = String(input);
  if (!/<[a-z][\s\S]*>/i.test(html)) html = marked.parse(html);
  const fragment = parseFragment(html);
  const visit = (node) => {
    if (!node.childNodes) return;
    node.childNodes = node.childNodes.flatMap((child) => {
      const text = textOf(child).trim();
      if (child.nodeName === "#comment") return [];
      if (
        child.tagName === "p" &&
        /^Internal linking:\s*add\s+3\s*[-–]\s*5\s+contextual links/i.test(text)
      )
        return [];
      if (
        child.tagName === "p" &&
        !child.childNodes.some((item) => item.tagName) &&
        /^(?:#{1,4}\s|[-*]\s|\d+\.\s)/m.test(text)
      ) {
        const converted = parseFragment(marked.parse(text)).childNodes;
        converted.forEach((item) => {
          item.parentNode = node;
          visit(item);
        });
        return converted;
      }
      if (child.tagName === "h1") {
        child.tagName = "h2";
        child.nodeName = "h2";
      }
      visit(child);
      return [child];
    });
    // Merge adjacent list fragments from editors that paste one paragraph per item.
    node.childNodes = node.childNodes.reduce((items, child) => {
      const previous = items.at(-1);
      if (
        ["ul", "ol"].includes(child.tagName) &&
        previous?.tagName === child.tagName
      )
        previous.childNodes.push(...child.childNodes);
      else items.push(child);
      return items;
    }, []);
  };
  visit(fragment);
  return sanitizeHtml(serialize(fragment), {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "h4",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "blockquote",
      "hr",
      "br",
      "a",
      "img",
      "figure",
      "figcaption",
      "div",
      "span",
      "mark",
      "section",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "iframe",
    ],
    allowedAttributes: {
      "*": ["id", "style"],
      mark: ["data-color"],
      a: ["href", "target", "rel", "title"],
      img: ["src", "alt", "title", "width", "height", "data-media-id"],
      ol: ["start"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      iframe: ["src", "title", "allowfullscreen", "width", "height"],
    },
    allowedStyles: {
      img: {
        "aspect-ratio": [/^\d{1,4}\s*\/\s*\d{1,4}$/],
        height: [/^auto$/],
      },
      "*": {
        "text-align": [/^(left|center|right|justify)$/],
        "font-size": [/^(12|14|16|18|20|24|28|32|40|48)px$/],
        color: [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d.,%\s]+\)$/i],
        "background-color": [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d.,%\s]+\)$/i],
      },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https", "data"], iframe: ["https"] },
    allowedIframeHostnames: [
      "www.youtube.com",
      "www.youtube-nocookie.com",
      "player.vimeo.com",
    ],
    transformTags: {
      a: (tagName, attributes) => ({
        tagName,
        attribs: {
          ...attributes,
          ...(attributes.target === "_blank"
            ? {
                rel: [
                  ...new Set(
                    `${attributes.rel || ""} noopener noreferrer`
                      .trim()
                      .split(/\s+/),
                  ),
                ].join(" "),
              }
            : {}),
        },
      }),
    },
    exclusiveFilter: (frame) =>
      frame.tag === "img" &&
      /^data:/i.test(frame.attribs.src || "") &&
      !/^data:image\/(png|jpeg|webp|avif);base64,/i.test(frame.attribs.src),
  });
};

export const editableFields = [
  "title",
  "slug",
  "category",
  "date",
  "image",
  "imageAlt",
  "imageMediaId",
  "shortDescription",
  "content",
  "faq",
  "metaTitle",
  "metaDescription",
  "primaryKeyword",
  "metaKeywords",
  "canonicalUrl",
  "ogTitle",
  "ogDescription",
  "ogImage",
  "twitterTitle",
  "twitterDescription",
  "twitterImage",
  "authorName",
  "authorProfileUrl",
  "authorCredentials",
  "publishedDate",
  "reviewedDate",
  "medicalDisclaimer",
  "schemaEnabled",
  "noIndex",
  "noFollow",
  "status",
  "published",
];
export const cleanBlogInput = (input = {}) => {
  const aliases = {
    content_html: "content",
    excerpt: "shortDescription",
    primary_keyword: "primaryKeyword",
    meta_title: "metaTitle",
    meta_description: "metaDescription",
    canonical_url: "canonicalUrl",
    published_at: "publishedDate",
    reviewed_at: "reviewedDate",
    medical_disclaimer: "medicalDisclaimer",
    schema_enabled: "schemaEnabled",
  };
  const source = { ...input };
  for (const [from, to] of Object.entries(aliases))
    if (from in input) source[to] = input[from];
  if (input.featured_image) {
    source.image = input.featured_image.url;
    source.imageAlt = input.featured_image.alt;
    source.imageMediaId = input.featured_image.media_id;
  }
  for (const network of ["og", "twitter"])
    for (const field of ["title", "description", "image"])
      if (input[network]?.[field] !== undefined)
        source[`${network}${field[0].toUpperCase()}${field.slice(1)}`] =
          input[network][field];
  if (input.author) {
    source.authorName = input.author.name;
    source.authorProfileUrl = input.author.profile_url;
    source.authorCredentials = input.author.credentials;
  }
  if (input.robots) {
    source.noIndex = /\bnoindex\b/i.test(input.robots);
    source.noFollow = /\bnofollow\b/i.test(input.robots);
  }
  const fields = Object.fromEntries(
    editableFields
      .filter((key) => key in source)
      .map((key) => [key, source[key]]),
  );
  for (const key of editableFields.filter(
    (key) =>
      !["faq", "schemaEnabled", "noIndex", "noFollow", "published"].includes(
        key,
      ),
  )) {
    if (
      fields[key] !== undefined &&
      fields[key] !== null &&
      typeof fields[key] !== "string"
    )
      throw Object.assign(new Error(`${key} must be text.`), { status: 422 });
  }
  if (fields.slug !== undefined)
    fields.slug = String(fields.slug).trim().toLowerCase();
  if (fields.content !== undefined)
    fields.content = normalizeContent(fields.content);
  for (const key of ["noIndex", "noFollow", "schemaEnabled", "published"])
    if (fields[key] !== undefined)
      fields[key] = fields[key] === true || fields[key] === "true";
  for (const key of ["date", "publishedDate", "reviewedDate"])
    if (fields[key] === "") fields[key] = null;
  if (typeof fields.faq === "string") fields.faq = JSON.parse(fields.faq);
  if (fields.faq)
    fields.faq = fields.faq
      .filter((faq) => faq.question?.trim() && faq.answer?.trim())
      .map(({ question, answer }) => ({
        question: sanitizeHtml(question, { allowedTags: [] }),
        answer: sanitizeHtml(answer, { allowedTags: [] }),
      }));
  return fields;
};

export const validateBlog = (blog) => {
  const errors = [],
    warnings = [];
  const body = parseFragment(blog.content || "");
  const nodes = [];
  const walk = (node) => {
    nodes.push(node);
    (node.childNodes || []).forEach(walk);
  };
  walk(body);
  const attr = (node, key) =>
    node.attrs?.find((item) => item.name === key)?.value || "";
  const links = nodes.filter(
    (node) => node.tagName === "a" && attr(node, "href"),
  );
  const images = nodes.filter((node) => node.tagName === "img");
  const internal = links.filter((node) => {
    try {
      return new URL(attr(node, "href"), SITE_URL).origin === SITE_URL;
    } catch {
      return false;
    }
  });
  if (!blog.title?.trim()) errors.push("Title is required.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(blog.slug || ""))
    errors.push("Slug must contain lowercase words separated by hyphens.");
  if (!textOf(body).trim()) errors.push("Article body is required.");
  if (
    nodes.some(
      (node) =>
        node.tagName === "p" &&
        /^(?:#{2,4}\s|[-*]\s|\d+\.\s)/.test(textOf(node).trim()),
    )
  )
    errors.push("Raw heading/list markers must be converted to semantic HTML.");
  if (blog.canonicalUrl && blog.canonicalUrl !== liveBlogUrl(blog.slug))
    errors.push("Canonical must match the final blog URL.");
  if (!["draft", "published", "archived"].includes(blog.status || "draft"))
    errors.push("Invalid publication state.");
  const validImage = (value) =>
    /^data:image\/(?:png|jpeg|webp|avif);base64,/i.test(value || "") ||
    /^(?:https?:\/\/[^\s]+|\/uploads\/[^\s]+)$/i.test(value || "");
  for (const key of ["image", "ogImage", "twitterImage"])
    if (blog[key] && !validImage(blog[key]))
      errors.push(`${key} must be a valid public image URL.`);
  if (blog.authorProfileUrl) {
    try {
      if (!/^https?:$/.test(new URL(blog.authorProfileUrl).protocol))
        throw new Error();
    } catch {
      errors.push("Author profile must be an absolute HTTP(S) URL.");
    }
  }
  for (const key of ["publishedDate", "reviewedDate"])
    if (blog[key] && Number.isNaN(new Date(blog[key]).getTime()))
      errors.push(`${key} is invalid.`);
  if (!blog.metaDescription?.trim())
    warnings.push("Meta description is missing.");
  if (!blog.image) warnings.push("Featured/social image is missing.");
  if (/^data:/i.test(blog.ogImage || blog.image || ""))
    warnings.push(
      "Inline image data is not a public social image URL. Upload/select a media-library image.",
    );
  if (
    (blog.image && !blog.imageAlt?.trim()) ||
    images.some((node) => !attr(node, "alt").trim())
  )
    warnings.push("Some images need alt text.");
  if (!internal.length) warnings.push("No contextual internal links.");
  if ((blog.metaTitle || blog.title || "").length > 60)
    warnings.push("Meta title exceeds 60 characters.");
  if ((blog.metaDescription || "").length > 160)
    warnings.push("Meta description exceeds 160 characters.");
  if (/https?:\/\//.test(textOf(body)) && !links.length)
    warnings.push("Reference URLs are plain text.");
  let level = 1;
  for (const node of nodes.filter((item) =>
    /^h[234]$/.test(item.tagName || ""),
  )) {
    const next = Number(node.tagName[1]);
    if (next > level + 1) warnings.push("Unusual heading order.");
    level = next;
  }
  return {
    errors,
    warnings: [...new Set(warnings)],
    info: {
      wordCount: textOf(body).trim().split(/\s+/).filter(Boolean).length,
      headings: nodes.filter((node) => /^h[23]$/.test(node.tagName || ""))
        .length,
      internalLinks: internal.length,
      externalLinks: links.length - internal.length,
      imageCount: images.length,
    },
  };
};
