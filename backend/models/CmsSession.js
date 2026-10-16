import mongoose from "mongoose";
export default mongoose.model(
  "CmsSession",
  new mongoose.Schema(
    {
      tokenHash: { type: String, required: true, unique: true },
      userId: { type: String, required: true },
      credentialVersion: String,
      scopes: [String],
      expiresAt: { type: Date, required: true },
      revokedAt: Date,
    },
    { timestamps: true },
  ),
);
