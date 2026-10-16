import { parse, parseFragment } from "parse5";
import {
  liveBlogUrl,
  blogRobots,
  absoluteImage,
} from "../../shared/blogSeo.mjs";
const findAll = (node, predicate) => [
  ...(predicate(node) ? [node] : []),
  ...(node.childNodes || []).flatMap((child) => findAll(child, predicate)),
];
const textOf = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes || []).map(textOf).join("");
const attr = (node, key) =>
  node.attrs?.find((item) => item.name === key)?.value;
export const verifyBlogHtml = (html, blog) => {
  const document = parse(html),
    errors = [];
  const expect = (condition, message) => {
    if (!condition) errors.push(message);
  };
  const title = findAll(document, (node) => node.tagName === "title");
  const h1 = findAll(document, (node) => node.tagName === "h1");
  const description = findAll(
    document,
    (node) => node.tagName === "meta" && attr(node, "name") === "description",
  );
  const canonicals = findAll(
    document,
    (node) => node.tagName === "link" && attr(node, "rel") === "canonical",
  );
  const expectedUrl = liveBlogUrl(blog.slug);
  expect(
    title.length === 1 && textOf(title[0]) === (blog.metaTitle || blog.title),
    "Public title does not match CMS.",
  );
  expect(
    h1.length === 1 && textOf(h1[0]) === blog.title,
    "Expected exactly one article H1.",
  );
  expect(
    description.length === 1 &&
      attr(description[0], "content") ===
        (blog.metaDescription || blog.shortDescription || ""),
    "Public description does not match CMS.",
  );
  expect(
    canonicals.length === 1 && attr(canonicals[0], "href") === expectedUrl,
    "Public canonical is incorrect or duplicated.",
  );
  const ogUrl = findAll(
    document,
    (node) => node.tagName === "meta" && attr(node, "property") === "og:url",
  );
  expect(
    ogUrl.length === 1 && attr(ogUrl[0], "content") === expectedUrl,
    "Open Graph URL must match canonical.",
  );
  const robots = findAll(
    document,
    (node) => node.tagName === "meta" && attr(node, "name") === "robots",
  );
  expect(
    robots.length === 1 &&
      attr(robots[0], "content")
        ?.replace(/\s/g, "")
        .startsWith(blogRobots(blog)),
    "Public robots does not match CMS.",
  );
  const body = findAll(document, (node) =>
    node.attrs?.some(
      (item) =>
        item.name === "class" && item.value.split(" ").includes("blog-content"),
    ),
  )[0];
  const text = body ? textOf(body).replace(/\s+/g, " ").trim() : "";
  const expectedText = textOf(parseFragment(blog.content || ""))
    .replace(/\s+/g, " ")
    .trim();
  expect(
    text === expectedText && Boolean(text),
    "Public article content differs from the saved revision.",
  );
  expect(
    !/Internal linking:\s*add\s+3\s*[-–]\s*5|(?:^|\n)\s*#{2,4}\s/i.test(text),
    "Editorial or Markdown markers remain public.",
  );
  if (blog.image)
    expect(
      findAll(
        document,
        (node) => node.tagName === "img" && attr(node, "src") === blog.image,
      ).length > 0,
      "Featured image is missing.",
    );
  for (const [kind, expected] of [
    ["og:image", absoluteImage(blog.ogImage || blog.image)],
    [
      "twitter:image",
      absoluteImage(blog.twitterImage || blog.ogImage || blog.image),
    ],
  ]) {
    if (expected)
      expect(
        findAll(
          document,
          (node) =>
            node.tagName === "meta" &&
            (attr(node, "name") === kind || attr(node, "property") === kind) &&
            attr(node, "content") === expected,
        ).length === 1,
        `${kind} does not match CMS.`,
      );
  }
  if (blog.schemaEnabled !== false) {
    const schemas = findAll(
      document,
      (node) =>
        node.tagName === "script" &&
        attr(node, "type") === "application/ld+json",
    );
    try {
      const graph = schemas.flatMap((node) => {
        const schema = JSON.parse(textOf(node));
        return schema["@graph"] || [schema];
      });
      expect(
        graph.some(
          (node) =>
            ["Article", "BlogPosting"].includes(node["@type"]) &&
            node.mainEntityOfPage?.["@id"] === expectedUrl,
        ),
        "Article schema is missing or has incorrect identity.",
      );
      expect(
        !graph.some((node) =>
          ["Review", "AggregateRating"].includes(node["@type"]),
        ),
        "Unsupported review/rating schema.",
      );
      expect(
        (blog.faq || []).length > 0 ||
          !graph.some((node) => node["@type"] === "FAQPage"),
        "FAQ schema has no visible FAQ content.",
      );
    } catch {
      errors.push("Invalid JSON-LD.");
    }
  }
  return errors;
};
