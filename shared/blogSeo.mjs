export const SITE_URL = "https://drankushgarg.in";
export const schemaJson = (schema) =>
  JSON.stringify(schema).replace(/</g, "\\u003c");
export const liveBlogUrl = (slug) =>
  `${SITE_URL}/blog/${encodeURIComponent(slug)}`;
export const blogRobots = (blog, preview = false) =>
  `${preview || blog.noIndex ? "noindex" : "index"},${blog.noFollow ? "nofollow" : "follow"}`;
export const absoluteImage = (value, origin = SITE_URL) => {
  if (!value || /^data:/i.test(value)) return undefined;
  try {
    const url = new URL(value, origin);
    return /^https?:$/.test(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
};
export const buildBlogSchema = (blog, profile = {}) => {
  if (blog.schemaEnabled === false) return null;
  const canonical = blog.canonicalUrl || liveBlogUrl(blog.slug);
  const author = {
    "@type": "Person",
    name: blog.authorName || profile.name || "Dr. Ankush Garg",
  };
  const profileUrl = blog.authorProfileUrl || profile.profileUrl;
  if (profileUrl) author.url = profileUrl;
  const graph = [
    {
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      headline: blog.title,
      description: blog.metaDescription || blog.shortDescription,
      url: canonical,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      datePublished: blog.publishedDate || undefined,
      dateModified: blog.modifiedDate || blog.updatedAt,
      author,
      publisher: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#publisher`,
        name: "Dr. Ankush Garg - Manovaidya",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      },
      image: absoluteImage(blog.image),
      articleSection: blog.category || undefined,
      keywords: blog.metaKeywords || undefined,
    },
  ];
  const faq = (blog.faq || []).filter(
    (item) => item.question?.trim() && item.answer?.trim(),
  );
  if (faq.length)
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  return { "@context": "https://schema.org", "@graph": graph };
};
