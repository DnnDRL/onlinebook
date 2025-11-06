import express from "express";
import {
  getReviewsByISBN,
  addReview,
  updateReview,
  deleteReview
} from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:isbn", getReviewsByISBN);
router.post("/:isbn", verifyToken, addReview);
router.put("/:id", verifyToken, updateReview);
router.delete("/:id", verifyToken, deleteReview);

export default router;
