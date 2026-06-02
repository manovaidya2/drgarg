// controllers/blogController.js
import Blog from "../models/Blog.js";
import mongoose from "mongoose";

// CREATE
export const createBlog = async (req, res) => {
  try {
    const blogData = {
      ...req.body,
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
    const blogs = await Blog.find({})
      .select("title slug category date image shortDescription createdAt metaTitle metaDescription")
      .sort({ createdAt: -1 })
      .lean();

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
    const { slug } = req.params;
    
    // Check if the parameter is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(slug)) {
      // If it's a valid ID, try to find by ID first
      const blogById = await Blog.findById(slug);
      if (blogById) {
        // Increment view count
        await Blog.findByIdAndUpdate(slug, { $inc: { views: 1 } });
        return res.json(blogById);
      }
    }
    
    // If not a valid ID or no blog found by ID, try to find by slug
    const blog = await Blog.findOne({ slug: slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    // Increment view count
    await Blog.findOneAndUpdate({ slug: slug }, { $inc: { views: 1 } });
    
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
      ...req.body,
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