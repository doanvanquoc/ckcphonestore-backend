import User from "../models/user.js";
import jwt from "jsonwebtoken";
import authService from "../services/auth.js";
const cloudinary = require("cloudinary").v2;

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const register = async (req, res) => {
  const { email, password, fullname, birthday, phone_number, sex } = req.body;
  let avatar;

  if (!req.file) {
    avatar =
      "https://res.cloudinary.com/dxe8ykmrn/image/upload/v1705375410/user-avatar/tgaudfhwukm4c6gm0zzy.jpg";
  } else {
    avatar = req.file.path;
  }

  if (!email || !password || !fullname || !phone_number || !birthday || !sex) {
    if (req.file) {
      cloudinary.uploader.destroy(req.file.filename);
    }
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
  }

  try {
    const result = await authService.register({
      email,
      password,
      fullname,
      birthday,
      phone_number,
      sex,
      file: req.file,
    });

    res.json(result);
  } catch (error) {
    if (req.file) {
      cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(500).json(error);
  }
};

const checkEmail = async (req, res) => {
  const email = req.body.email
  try {
    const result = await authService.checkEmail(email)
    res.json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

export default { login, register, checkEmail };
