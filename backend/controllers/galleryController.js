import fs from "fs";
import path from "path";
import Gallery from "../models/Gallery.js";

const buildImageUrl = (req, filename) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  return `${baseUrl}/uploads/${filename}`;
};

const deleteUploadedFile = (imageUrl = "") => {
  const uploadsIndex = imageUrl.indexOf("/uploads/");
  if (uploadsIndex === -1) return;

  const filename = imageUrl.slice(uploadsIndex + "/uploads/".length);
  const filePath = path.resolve("uploads", filename);
  const uploadsRoot = path.resolve("uploads");

  if (!filePath.startsWith(uploadsRoot)) return;
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

export const createGalleryItem = async (req, res) => {
  try {
    const { title, description, category, altText, sortOrder, isActive } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({ success: false, message: "Title and image are required" });
    }

    const item = await Gallery.create({
      title,
      description,
      category,
      altText: altText || title,
      sortOrder: Number(sortOrder) || 0,
      isActive: isActive === undefined ? true : isActive === "true" || isActive === true,
      image: buildImageUrl(req, req.file.filename),
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGalleryItems = async (req, res) => {
  try {
    const filter = req.query.admin === "true" ? {} : { isActive: true };
    const items = await Gallery.find(filter).sort({ sortOrder: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGalleryItemById = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    const { title, description, category, altText, sortOrder, isActive } = req.body;

    if (req.file) {
      deleteUploadedFile(item.image);
      item.image = buildImageUrl(req, req.file.filename);
    }

    item.title = title ?? item.title;
    item.description = description ?? item.description;
    item.category = category ?? item.category;
    item.altText = altText ?? item.altText;
    item.sortOrder = sortOrder === undefined ? item.sortOrder : Number(sortOrder) || 0;
    item.isActive = isActive === undefined ? item.isActive : isActive === "true" || isActive === true;

    await item.save();
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    deleteUploadedFile(item.image);
    res.json({ success: true, message: "Gallery item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
