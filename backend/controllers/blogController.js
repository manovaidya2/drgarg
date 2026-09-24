// controllers/blogController.js
import Blog from "../models/Blog.js";
import mongoose from "mongoose";

const publicBlogFilter = {
  published: { $ne: false },
  status: { $nin: ["draft", "unpublished", "ongoing", "Ongoing", "ONGOING"] },
};

const publicBlogFields =
  "title slug category date shortDescription createdAt metaTitle metaDescription publishedDate modifiedDate published status";

const normalizePage = (value) => {
  const page = Number.parseInt(value, 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
};

const normalizeLimit = (value) => {
  const limit = Number.parseInt(value, 10);
  if (!Number.isFinite(limit) || limit <= 0) return null;
  return Math.min(limit, 50);
};

const getAdminBlogImageUrl = (req, id) =>
  `${req.protocol}://${req.get("host")}/api/blogs/admin/${id}/image`;

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
    const isDraft = req.body.status === "draft" || req.body.published === false;
    const blogData = {
      ...removePerBlogAuthorBiography(req.body),
      published: !isDraft,
      status: isDraft ? "draft" : "published",
      publishedDate: isDraft
        ? null
        : req.body.publishedDate || req.body.date || new Date(),
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
    const isAdmin = req.query.admin === "true";
    const page = normalizePage(req.query.page);
    const limit = normalizeLimit(req.query.limit);
    const filter = isAdmin ? {} : { ...publicBlogFilter };

    if (isAdmin) {
      res.set("Cache-Control", "private, no-store");
    }

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
    const allCategories = await Blog.distinct(
      "category",
      isAdmin ? {} : publicBlogFilter
    );

    if (isAdmin || category || excludeSlug || req.query.page || limit) {
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

export const getAdminBlogById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }

    const blog = await Blog.findById(req.params.id)
      .select("-image -content -ogImage -twitterImage")
      .lean();
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.set("Cache-Control", "private, no-store");
    const hasImage = Boolean(
      await Blog.exists({
        _id: req.params.id,
        image: { $type: "string", $ne: "" },
      })
    );
    return res.json({
      ...blog,
      hasImage,
      imagePreviewUrl: hasImage
        ? getAdminBlogImageUrl(req, req.params.id)
        : null,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAdminBlogContent = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }
    const blog = await Blog.findById(req.params.id).select("content").lean();
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.set("Cache-Control", "private, no-store");
    return res.json({ content: blog.content || "" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAdminBlogImage = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).end();
    }
    const blog = await Blog.findById(req.params.id).select("image").lean();
    const image = blog?.image;
    if (!image) return res.status(404).end();
    if (/^https?:\/\//i.test(image)) return res.redirect(image);

    const dataImage = image.match(/^data:([^;]+);base64,(.+)$/s);
    if (dataImage) {
      res.set("Cache-Control", "private, max-age=3600");
      res.type(dataImage[1]);
      return res.send(Buffer.from(dataImage[2], "base64"));
    }
    return res.redirect(image.startsWith("/") ? image : `/${image}`);
  } catch (error) {
    return res.status(500).end();
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
    
    const isDraft = req.body.status === "draft" || req.body.published === false;
    const cleanedBlogData = removePerBlogAuthorBiography(req.body);
    if (!cleanedBlogData.image) delete cleanedBlogData.image;
    const updateData = {
      ...cleanedBlogData,
      published: !isDraft,
      status: isDraft ? "draft" : "published",
      publishedDate: isDraft
        ? null
        : req.body.publishedDate || req.body.date || new Date(),
      modifiedDate: new Date()
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
