import User from "../models/user.js";
import jwt from "jsonwebtoken";
import authService from '../services/auth.js'
const cloudinary = require("cloudinary").v2;

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await authService.login(req.body)
    res.json(result)
  } catch (error) {
    res.status(500).json(error)
  }
};

const register = async (req, res) => {
  const { email, password, fullname, birthday, phone_number, sex } = req.body;
  const avatar = req.file.path
  if (!email || !password || !fullname || !phone_number || !avatar || !birthday || !sex) {
    cloudinary.uploader.destroy(req.file.filename)
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await authService.register(req.body, req.file)
    res.json(result)
  } catch (error) {
    res.status(500).json(error)
  }
};

export default { login, register };
