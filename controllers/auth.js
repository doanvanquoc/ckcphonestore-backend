import User from "../models/user.js";
import jwt from "jsonwebtoken";
import authService from "../services/auth.js";
const cloudinary = require("cloudinary").v2;
import dotenv from 'dotenv'
dotenv.config()

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log(req.body)
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
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
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
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
  const email = req.body.email;
  if (!email) {
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await authService.checkEmail(email);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const verifyToken = (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(400).json({ code: 0, message: "Vui lòng truyền token" });
  }
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    console.log(user)
    res.json({ code: 1, data: user.user });
  } catch (error) {
    res.json({ code: 0, message: "Token hết hạn hoặc không chính xác", error });
  }
};

export default { login, register, checkEmail, verifyToken };
