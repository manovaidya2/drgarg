import mongoose from "mongoose";
export default mongoose.model(
  "BlogMedia",
  new mongoose.Schema(
    {
      url: String,
      filename: String,
      originalFilename: String,
      mimeType: String,
      width: Number,
      height: Number,
      alt: { type: String, default: "" },
      caption: String,
      actorId: String,
    },
    { timestamps: true },
  ),
);
