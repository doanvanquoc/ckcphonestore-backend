import express from "express";
import reviewController from "../controllers/review.js";
const router = express.Router();

router.get("/:id", reviewController.getReviewsByProductID);

export default router;
