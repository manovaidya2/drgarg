import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    category: { type: String, trim: true, default: "Clinic" },
    image: { type: String, required: true },
    altText: { type: String, trim: true, default: "" },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
