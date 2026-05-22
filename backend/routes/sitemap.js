import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const blogs = await Blog.find({}, "slug updatedAt");

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

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static pages
    staticPages.forEach((page) => {
      xml += `
      <url>
        <loc>https://drankushgarg.com${page}</loc>
        <priority>0.9</priority>
      </url>`;
    });

    // Dynamic blog pages
    blogs.forEach((blog) => {
      xml += `
      <url>
        <loc>https://drankushgarg.com/blog/${blog.slug}</loc>
        <lastmod>${blog.updatedAt.toISOString()}</lastmod>
        <priority>0.8</priority>
      </url>`;
    });

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);

  } catch (err) {
    console.log(err);
    res.status(500).send("Sitemap Error");
  }
});

export default router;