// controllers/blogController.js
import Blog from "../models/Blog.js";
import mongoose from "mongoose";

const publicBlogFilter = {
  published: { $ne: false },
  status: { $nin: ["draft", "unpublished", "ongoing", "Ongoing", "ONGOING"] },
};

const publicBlogFields =
  "title slug category date shortDescription createdAt metaTitle metaDescription publishedDate modifiedDate";

const normalizePage = (value) => {
  const page = Number.parseInt(value, 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
};

const normalizeLimit = (value) => {
  const limit = Number.parseInt(value, 10);
  if (!Number.isFinite(limit) || limit <= 0) return null;
  return Math.min(limit, 50);
};

const removePerBlogAuthorBiography = (blogData = {}) => {
  const cleaned = { ...blogData };
  [
    "authorBio",
    "authorBiography",
    "authorDescription",
    "authorProfile",
    "authorDetails",
  ].forEach((field) => {
    delete cleaned[field];
  });

  return cleaned;
};

// CREATE
export const createBlog = async (req, res) => {
  try {
    const blogData = {
      ...removePerBlogAuthorBiography(req.body),
      // Ensure meta fields are properly set
      publishedDate: req.body.publishedDate || req.body.date || new Date(),
      modifiedDate: new Date()
    };
    
    const blog = new Blog(blogData);
    await blog.save();
    res.status(201).json({ success: true, blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET ALL
export const getBlogs = async (req, res) => {
  try {
    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    const { category, excludeSlug } = req.query;
    const page = normalizePage(req.query.page);
    const limit = normalizeLimit(req.query.limit);
    const filter = { ...publicBlogFilter };

    if (category && category !== "All") {
      filter.category = category;
    }

    if (excludeSlug) {
      filter.slug = { $ne: excludeSlug };
    }

    const query = Blog.find(filter)
      .select(publicBlogFields)
      .sort({ createdAt: -1 })
      .lean();

    if (limit) {
      query.skip((page - 1) * limit).limit(limit);
    }

    // This Atlas connection can stall when multiple collection reads are
    // started together. These small indexed reads are faster sequentially.
    const blogs = await query;
    const total = await Blog.countDocuments(filter);
    const allCategories = await Blog.distinct("category", publicBlogFilter);

    if (category || excludeSlug || req.query.page || limit) {
      return res.status(200).json({
        blogs,
        categories: allCategories.filter(Boolean).sort(),
        pagination: {
          page,
          limit: limit || total || 1,
          total,
          totalPages: limit ? Math.max(1, Math.ceil(total / limit)) : 1,
        },
      });
    }

    res.status(200).json(blogs);
  } catch (error) {
    console.error("❌ getBlogs error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BY SLUG (with ID detection)
export const getBlogBySlug = async (req, res) => {
  try {
    res.set("Cache-Control", "public, max-age=120, stale-while-revalidate=600");
    const { slug } = req.params;
    
    // Check if the parameter is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(slug)) {
      // If it's a valid ID, try to find by ID first
      const blogById = await Blog.findOne({ _id: slug, ...publicBlogFilter }).lean();
      if (blogById) {
        // Increment view count
        Blog.findByIdAndUpdate(slug, { $inc: { views: 1 } }).catch((error) =>
          console.error("View count update failed:", error)
        );
        return res.json(blogById);
      }
    }
    
    // If not a valid ID or no blog found by ID, try to find by slug
    const blog = await Blog.findOne({ slug: slug, ...publicBlogFilter }).lean();
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    // Increment view count
    Blog.findOneAndUpdate({ slug: slug }, { $inc: { views: 1 } }).catch((error) =>
      console.error("View count update failed:", error)
    );
    
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }
    
    const updateData = {
      ...removePerBlogAuthorBiography(req.body),
      modifiedDate: new Date() // Always update modified date
    };
    
    const blog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.json({ success: true, blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }
    
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Add view tracking endpoint
export const incrementViews = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndUpdate(id, { $inc: { views: 1 } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
