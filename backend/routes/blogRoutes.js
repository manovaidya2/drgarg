// import express from "express";
// import {
//   createBlog,
//   getBlogs,
//   getBlogBySlug,
//   updateBlog,
//   deleteBlog
// } from "../controllers/blogController.js";

// const router = express.Router();

// router.post("/", createBlog);        // create
// router.get("/", getBlogs);           // get all
// router.get("/:slug", getBlogBySlug); // get one
// router.put("/:id", updateBlog);              // update
// router.delete("/:id", deleteBlog);           // delete


// export default router;



// routes/blogRoutes.js
import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog
} from "../controllers/blogController.js";

const router = express.Router();

// IMPORTANT: Order matters! Put specific routes before dynamic routes

// Create blog - POST /api/blogs
router.post("/", createBlog);

// Get all blogs - GET /api/blogs
router.get("/", getBlogs);

// Update blog - PUT /api/blogs/:id (place before slug route)
router.put("/:id", updateBlog);

// Delete blog - DELETE /api/blogs/:id (place before slug route)
router.delete("/:id", deleteBlog);

// Get blog by slug - GET /api/blogs/:slug (this should be LAST)
// This will only match if none of the above routes match
router.get("/:slug", getBlogBySlug);

export default router;