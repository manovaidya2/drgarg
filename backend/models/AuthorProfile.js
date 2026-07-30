import mongoose from "mongoose";

const authorProfileSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "dr-ankush-garg" },
    name: { type: String, required: true },
    title: { type: String, required: true },
    credentials: { type: String, required: true },
    biography: { type: String, required: true },
    profileUrl: { type: String, default: "https://drankushgarg.in/about" },
    image: { type: String, default: "https://drankushgarg.in/images/dr-ankush-garg.webp" },
    email: { type: String, default: "contact@drankushgarg.in" },
    phone: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("AuthorProfile", authorProfileSchema);
