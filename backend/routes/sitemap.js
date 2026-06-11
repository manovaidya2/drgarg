import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

const SITE_URL = "https://drankushgarg.in";

const escapeXml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

router.get("/sitemap.xml", async (req, res) => {
  try {
    const blogs = await Blog.find({}, "slug updatedAt createdAt");

    const staticPages = [
      "",
      "/about",
      "/blog",
      "/treatments",
      "/appointment",
      "/mindwellness",
      "/case-study",
      "/media-coverage",
      "/neuro-ayurveda-system",
      "/autism-adhd",
      "/adult-mental-health",
      "/teenage-mental-health",
      "/seniour-mental-health",
      "/testimonials",
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    staticPages.forEach((page) => {
      xml += `
  <url>
    <loc>${escapeXml(`${SITE_URL}${page}`)}</loc>
    <priority>0.9</priority>
  </url>`;
    });

    blogs.forEach((blog) => {
      if (!blog.slug) return;

      const safeSlug = encodeURIComponent(blog.slug);
      const lastmod = blog.updatedAt || blog.createdAt || new Date();

      xml += `
  <url>
    <loc>${escapeXml(`${SITE_URL}/blog/${safeSlug}`)}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>`;
    });

    xml += `\n</urlset>`;

    res.set("Content-Type", "application/xml; charset=utf-8");
    res.send(xml);
  } catch (err) {
    console.log(err);
    res.status(500).send("Sitemap Error");
  }
});

export default router;