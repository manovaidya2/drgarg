// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: String,
    date: { type: Date, default: Date.now },
    image: String,
    shortDescription: String,
    content: String,
    faq: [
      {
        question: { type: String },
        answer: { type: String }
      }
    ],
    // SEO and Meta Fields
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    canonicalUrl: { type: String },
    publishedDate: { type: Date },
    modifiedDate: { type: Date },
    // Additional SEO fields
    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String },
    twitterTitle: { type: String },
    twitterDescription: { type: String },
    twitterImage: { type: String },
    published: { type: Boolean, default: true },
    status: { type: String, default: "published" },
    // For search engine indexing
    noIndex: { type: Boolean, default: false },
    noFollow: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    autoIndex: false,
    autoCreate: false,
  }
);

blogSchema.index({ published: 1, status: 1, category: 1, createdAt: -1 });
blogSchema.index({ createdAt: -1 });

// Pre-save middleware to set meta defaults
blogSchema.pre('save', function(next) {
  // Set metaTitle to title if not provided
  if (!this.metaTitle && this.title) {
    this.metaTitle = this.title;
  }
  
  // Set metaDescription to shortDescription if not provided
  if (!this.metaDescription && this.shortDescription) {
    this.metaDescription = this.shortDescription;
  }
  
  // Set publishedDate to date if not provided
  if (!this.publishedDate && this.date) {
    this.publishedDate = this.date;
  }
  
  // Set modifiedDate to current date
  this.modifiedDate = new Date();
  
  // Set canonicalUrl to blog URL if not provided
  if (!this.canonicalUrl && this.slug) {
    this.canonicalUrl = `https://drankushgarg.in/blog/${this.slug}`;
  }
  
  next();
});

export default mongoose.model("Blog", blogSchema);
