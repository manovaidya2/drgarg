import express from "express";
import {
  getAuthorProfile,
  updateAuthorProfile,
} from "../controllers/authorProfileController.js";

const router = express.Router();

router.get("/", getAuthorProfile);
router.put("/", updateAuthorProfile);

export default router;
