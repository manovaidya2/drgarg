import express from "express";
import {
  createCaseStudy,
  getAllCaseStudies,
  getCaseStudyBySlug,
  getCaseStudyById,
  getCaseStudyImage,
  getCaseStudyContent,
  deleteCaseStudy,
  updateCaseStudy
} from "../controllers/caseStudyController.js";

const router = express.Router();

router.post("/", createCaseStudy);
router.get("/", getAllCaseStudies);
router.get("/id/:id", getCaseStudyById);
router.get("/:slug/image", getCaseStudyImage);
router.get("/:slug/content", getCaseStudyContent);
router.get("/:slug", getCaseStudyBySlug);
router.delete("/:id", deleteCaseStudy);
router.put("/:id", updateCaseStudy);  // Add this route

export default router;
