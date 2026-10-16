import express from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import BlogMedia from "../models/BlogMedia.js";
import { requireScope } from "../middleware/cmsAuth.js";
const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, done) =>
    done(
      null,
      ["image/jpeg", "image/png", "image/webp", "image/avif"].includes(
        file.mimetype,
      ),
    ),
});
const uploadDir =
  process.env.CMS_UPLOAD_DIR ||
  fileURLToPath(new URL("../uploads/", import.meta.url));
router.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
router.get("/", requireScope("media:read"), async (req, res, next) => {
  try {
    const query = String(req.query.query || "")
      .slice(0, 150)
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const filter = query ? { originalFilename: new RegExp(query, "i") } : {};
    const media = await BlogMedia.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * 30)
      .limit(30)
      .lean();
    res.json({ media, total: await BlogMedia.countDocuments(filter), page });
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  requireScope("media:write"),
  upload.single("image"),
  async (req, res, next) => {
    let outputPath;
    try {
      if (!req.file)
        return res
          .status(422)
          .json({
            message: "Upload a JPEG, PNG, WebP or AVIF image under 8 MB.",
          });
      const decoder = sharp(req.file.buffer, { limitInputPixels: 40000000 });
      const metadata = await decoder.metadata();
      if (!["jpeg", "png", "webp", "heif", "avif"].includes(metadata.format))
        return res
          .status(422)
          .json({ message: "File content is not an approved web image." });
      const filename = `blog-${randomUUID()}.webp`;
      await fs.mkdir(uploadDir, { recursive: true });
      outputPath = path.join(uploadDir, filename);
      const info = await decoder
        .rotate()
        .webp({ quality: 88 })
        .toFile(outputPath);
      const origin = (
        process.env.PUBLIC_API_URL || `${req.protocol}://${req.get("host")}`
      ).replace(/\/$/, "");
      const media = await BlogMedia.create({
        url: `${origin}/uploads/${filename}`,
        filename,
        originalFilename: path.basename(req.file.originalname),
        mimeType: "image/webp",
        width: info.width,
        height: info.height,
        alt: String(req.body.alt || "").slice(0, 500),
        caption: String(req.body.caption || "").slice(0, 1000),
        actorId: req.cmsSession.userId,
      });
      res.status(201).json({ success: true, media });
    } catch (error) {
      if (outputPath) await fs.unlink(outputPath).catch(() => {});
      res.status(422).json({ message: "Image could not be decoded or saved." });
    }
  },
);
router.patch("/:id", requireScope("media:write"), async (req, res, next) => {
  try {
    const media = await BlogMedia.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          alt: String(req.body.alt || "").slice(0, 500),
          caption: String(req.body.caption || "").slice(0, 1000),
        },
      },
      { new: true, runValidators: true },
    );
    if (!media) return res.status(404).json({ message: "Media not found." });
    res.json({ media });
  } catch (error) {
    next(error);
  }
});
export default router;
