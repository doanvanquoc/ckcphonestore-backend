import userController from "../controllers/user.js";
import express from "express";
import cloud from '../config/cloudinary.js'

const router = express.Router();

router.get("/:id", userController.getUserByID);
router.post("/update",cloud.uploadAvatar.single('avatar'), userController.updateUser);
router.post("/change-pass", userController.changePass);

export default router;
