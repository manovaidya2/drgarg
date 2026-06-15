import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createGalleryItem,
  deleteGalleryItem,
  getGalleryItemById,
  getGalleryItems,
  updateGalleryItem,
} from "../controllers/galleryController.js";

const router = express.Router();

router.post("/", upload.single("image"), createGalleryItem);
router.get("/", getGalleryItems);
router.get("/:id", getGalleryItemById);
router.put("/:id", upload.single("image"), updateGalleryItem);
router.delete("/:id", deleteGalleryItem);

export default router;
