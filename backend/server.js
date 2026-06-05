import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import blogRoutes from "./routes/blogRoutes.js";
import caseStudyRoutes from "./routes/caseStudyRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import sitemapRoute from "./routes/sitemap.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.resolve(__dirname, "../frontend/dist");

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
  "/neuro-ayurveda-system",
  "/autism-adhd",
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
  app.use(express.static(frontendDist));

  app.get("*", (req, res, next) => {
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

    if (spaRouteRegex.some((rx) => rx.test(normalizedPath))) {
      return res.status(200).sendFile(path.join(frontendDist, "index.html"));
    }

    return res.status(404).sendFile(path.join(frontendDist, "index.html"));
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