import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const caseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    shortDescription: {
      type: String,
    },

    image: {
      type: String, // base64 OR image URL
    },

    content: {
      type: String, // HTML from editor
      required: true,
    },

    faqs: {
      type: [faqSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("CaseStudy", caseStudySchema);