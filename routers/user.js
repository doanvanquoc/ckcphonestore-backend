import userController from "../controllers/user.js";
import express from "express";

const router = express.Router();

router.get("/:id", userController.getUserByID);
router.post("/update", userController.updateUser);
router.post("/change-pass", userController.changePass);

export default router;
