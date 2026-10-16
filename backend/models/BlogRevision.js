import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    number: { type: Number, required: true },
    snapshot: { type: mongoose.Schema.Types.Mixed, required: true },
    actorId: { type: String, required: true },
    action: String,
    previousRevisionId: mongoose.Schema.Types.ObjectId,
    restoredRevisionId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true },
);
schema.index({ blogId: 1, number: 1 }, { unique: true });
export default mongoose.model("BlogRevision", schema);
