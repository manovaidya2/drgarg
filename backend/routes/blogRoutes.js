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
import { rateLimit } from 'express-rate-limit';
import { requireScope } from '../middleware/cmsAuth.js';
import { saveBlog, readBlog, findBlogs, listRevisions, rollbackBlog, previewBlog, verifyBlog } from '../controllers/blogCmsController.js';
import { normalizeContent } from '../utils/blogValidation.js';
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  getAdminBlogById,
  getAdminBlogContent,
  getAdminBlogImage,
  updateBlog,
  deleteBlog
} from "../controllers/blogController.js";

const router = express.Router();

// IMPORTANT: Order matters! Put specific routes before dynamic routes

// Create blog - POST /api/blogs
const writeLimit = rateLimit({ windowMs: 60000, limit: 60, standardHeaders: true, legacyHeaders: false });
router.post("/", requireScope('blog:write'), writeLimit, saveBlog('create'));
router.get('/cms', requireScope('blog:read'), findBlogs);
router.post('/cms/normalize', requireScope('blog:write'), writeLimit, (req, res) => res.json({ content: normalizeContent(req.body.content) }));
router.get('/cms/:id', requireScope('blog:read'), readBlog);
router.patch('/cms/:id', requireScope('blog:write'), writeLimit, saveBlog('update'));
router.post('/cms/:id/preview', requireScope('blog:read'), previewBlog);
router.post('/cms/:id/verify', requireScope('blog:read'), writeLimit, verifyBlog);
router.post('/cms/:id/publish', requireScope('blog:write'), writeLimit, saveBlog('publish'));
router.post('/cms/:id/unpublish', requireScope('blog:write'), writeLimit, saveBlog('unpublish'));
router.get('/cms/:id/revisions', requireScope('blog:read'), listRevisions);
router.post('/cms/:id/rollback/:revisionId', requireScope('blog:write'), writeLimit, rollbackBlog);

// Get all blogs - GET /api/blogs
router.get("/", (req, res, next) => req.query.admin === 'true' ? requireScope('blog:read')(req, res, next) : next(), getBlogs);

// Includes drafts for the admin editor.
router.get("/admin/:id/image", requireScope('blog:read'), getAdminBlogImage);
router.get("/admin/:id/content", requireScope('blog:read'), getAdminBlogContent);
router.get("/admin/:id", requireScope('blog:read'), readBlog);

// Update blog - PUT /api/blogs/:id (place before slug route)
router.put("/:id", requireScope('blog:write'), writeLimit, saveBlog('update'));
router.patch('/:id', requireScope('blog:write'), writeLimit, saveBlog('update'));

// Delete blog - DELETE /api/blogs/:id (place before slug route)
router.delete("/:id", requireScope('clinic:admin'), writeLimit, deleteBlog);

// Get blog by slug - GET /api/blogs/:slug (this should be LAST)
// This will only match if none of the above routes match
router.get("/:slug", getBlogBySlug);

export default router;
