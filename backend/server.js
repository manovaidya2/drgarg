import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath, pathToFileURL } from "url";

import blogRoutes from "./routes/blogRoutes.js";
import caseStudyRoutes from "./routes/caseStudyRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import sitemapRoute from "./routes/sitemap.js";
import Blog from "./models/Blog.js";
import CaseStudy from "./models/CaseStudy.js";
import {
  getStaticSeo,
  renderHtmlWithSeo,
  renderHtmlWithSsr,
  siteUrl,
} from "./utils/seoRenderer.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendClientDist = path.resolve(__dirname, "../frontend/dist/client");
const legacyFrontendDist = path.resolve(__dirname, "../frontend/dist");
const frontendDist = fs.existsSync(frontendClientDist)
  ? frontendClientDist
  : legacyFrontendDist;
const frontendIndex = path.join(frontendDist, "index.html");
const frontendServerEntry = path.resolve(
  __dirname,
  "../frontend/dist/server/entry-server.js"
);

const spaRoutes = [
  "/",
  "/about",
  "/blog",
  "/blog/:slug",
  "/treatments",
  "/appointment",
  "/mindwellness",
  "/case-study",
  "/case-study/:slug",
  "/media-coverage",
  "/gallery",
  "/neuro-ayurveda-system",
  "/autism-adhd",
  "/child-development-care",
  "/adult-mental-health",
  "/teenage-mental-health",
  "/seniour-mental-health",
  "/testimonials",
  "/thank-you",
];

const spaRouteRegex = spaRoutes.map((route) =>
  new RegExp("^" + route.replace(/:[^/]+/g, "[^/]+") + "/?$")
);

const app = express();

const stripHtml = (value = "") => String(value).replace(/<[^>]*>/g, " ");

const truncateDescription = (value = "") => {
  const clean = stripHtml(value).replace(/\s+/g, " ").trim();
  if (clean.length <= 160) return clean;
  return `${clean.slice(0, 157).trim()}...`;
};

const buildRequestSeo = async (reqPath) => {
  const normalizedPath =
    reqPath === "" || reqPath === "/" ? "/" : reqPath.replace(/\/$/, "");

  const blogMatch = normalizedPath.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = decodeURIComponent(blogMatch[1]);
    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) {
      return getStaticSeo(normalizedPath);
    }

    const canonical = blog.canonicalUrl || `${siteUrl}/blog/${blog.slug}`;
    const description =
      blog.metaDescription ||
      blog.shortDescription ||
      truncateDescription(blog.content);

    return {
      title: blog.metaTitle || blog.ogTitle || blog.title,
      description,
      keywords: blog.metaKeywords,
      canonical,
      image: blog.ogImage || blog.twitterImage || blog.image,
      robots: `${blog.noIndex ? "noindex" : "index"}, ${
        blog.noFollow ? "nofollow" : "follow"
      }, max-snippet:-1, max-image-preview:large, max-video-preview:-1`,
      type: "article",
    };
  }

  const caseStudyMatch = normalizedPath.match(/^\/case-study\/([^/]+)$/);
  if (caseStudyMatch) {
    const slug = decodeURIComponent(caseStudyMatch[1]);
    const caseStudy = await CaseStudy.findOne({ slug }).lean();

    if (!caseStudy) {
      return getStaticSeo(normalizedPath);
    }

    return {
      title: `${caseStudy.title} | Case Study | Dr Ankush Garg`,
      description:
        caseStudy.shortDescription || truncateDescription(caseStudy.content),
      keywords:
        "Dr Ankush Garg case study, Neuro Ayurveda case study, patient recovery Ayurveda",
      canonical: `${siteUrl}/case-study/${caseStudy.slug}`,
      image: caseStudy.image,
      type: "article",
    };
  }

  return getStaticSeo(normalizedPath);
};

let ssrModulePromise = null;

const getSsrRenderer = async () => {
  if (!fs.existsSync(frontendServerEntry)) return null;
  if (!ssrModulePromise) {
    ssrModulePromise = import(pathToFileURL(frontendServerEntry).href);
  }

  const ssrModule = await ssrModulePromise;
  return ssrModule.render;
};

const buildInitialData = async (reqPath) => {
  const normalizedPath =
    reqPath === "" || reqPath === "/" ? "/" : reqPath.replace(/\/$/, "");

  if (normalizedPath === "/blog") {
    const blogs = await Blog.find({})
      .select("title slug category date image shortDescription createdAt metaTitle metaDescription content")
      .sort({ createdAt: -1 })
      .lean();

    return { blogs };
  }

  const blogMatch = normalizedPath.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = decodeURIComponent(blogMatch[1]);
    const blog = await Blog.findOne({ slug }).lean();
    const relatedPosts = blog?.category
      ? await Blog.find({
          category: blog.category,
          slug: { $ne: slug },
        })
          .select("title slug category date image shortDescription createdAt metaTitle metaDescription")
          .sort({ createdAt: -1 })
          .limit(4)
          .lean()
      : [];

    return { blog, relatedPosts };
  }

  if (normalizedPath === "/case-study") {
    const caseStudies = await CaseStudy.find().sort({ createdAt: -1 }).lean();
    return { caseStudies };
  }

  const caseStudyMatch = normalizedPath.match(/^\/case-study\/([^/]+)$/);
  if (caseStudyMatch) {
    const slug = decodeURIComponent(caseStudyMatch[1]);
    const caseStudy = await CaseStudy.findOne({ slug }).lean();
    return { caseStudy };
  }

  return {};
};

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

/* API Routes */
app.use("/api/blogs", blogRoutes);
app.use("/api/case-studies", caseStudyRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/gallery", galleryRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    mongodb:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

/* Sitemap */
app.use("/", sitemapRoute);

/* Static Frontend */
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist, { index: false }));

  app.get("*", async (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    if (req.method !== "GET" || !req.accepts("html")) {
      return next();
    }

    const normalizedPath =
      req.path === "" || req.path === "/"
        ? "/"
        : req.path.replace(/\/$/, "");

    try {
      const indexHtml = fs.readFileSync(frontendIndex, "utf8");
      let initialData = {};
      try {
        initialData = await buildInitialData(normalizedPath);
      } catch (dataError) {
        console.error("SSR initial data failed:", dataError.message);
      }
      let renderedHtml;

      try {
        const render = await getSsrRenderer();
        if (render) {
          const ssrResult = render(req.originalUrl, initialData);
          renderedHtml = renderHtmlWithSsr(indexHtml, {
            appHtml: ssrResult.html,
            head: ssrResult.head,
            initialData,
          });
        } else {
          renderedHtml = renderHtmlWithSeo(
            indexHtml,
            await buildRequestSeo(normalizedPath)
          );
        }
      } catch (ssrError) {
        console.error("SSR render failed:", ssrError.message);
        renderedHtml = renderHtmlWithSeo(
          indexHtml,
          await buildRequestSeo(normalizedPath)
        );
      }

      if (spaRouteRegex.some((rx) => rx.test(normalizedPath))) {
        return res.status(200).send(renderedHtml);
      }

      return res.status(404).send(renderedHtml);
    } catch (error) {
      return next(error);
    }
  });
}

/* 404 API / Other Routes */
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
  });
});

/* Error Handler */
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message);
  res.status(500).json({
    error: err.message,
  });
});

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
