import express from "express";
import {
  createCaseStudy,
  getAllCaseStudies,
  getCaseStudyBySlug,
  deleteCaseStudy,
} from "../controllers/caseStudyController.js";

const router = express.Router();

router.post("/", createCaseStudy);
router.get("/", getAllCaseStudies);
router.get("/:slug", getCaseStudyBySlug);
router.delete("/:id", deleteCaseStudy);

export default router;
