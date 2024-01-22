import express from "express";
import reviewController from "../controllers/review.js";
const router = express.Router();

router.get("/:id", reviewController.getReviewsByProductID);
router.get("/product/:productID/user/:userID", reviewController.getReviewsByProductIDAndUserID);
router.post('/create', reviewController.createReview)

export default router;
