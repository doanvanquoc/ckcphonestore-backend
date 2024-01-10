import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
  }
  User.findOne({
    where: { username: username, password: password },
  })
    .then((user) => {
      if (user) {
        var token = jwt.sign(
          { username: user.username },
          process.env.SECRECT_KEY,
          { expiresIn: 60 }
        );
        res.json({
          message: "Đăng nhập thành công",
          username: user.username,
          token: token,
        });
      } else {
        res.status(401).json({ meaasge: "Không tìm thấy người dùng" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ meaasge: "Lỗi server" });
    });
};

const register = (req, res) => {
  const { username, password, fullname } = req.body;
  if (!username || !password || !fullname) {
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
  }
  User.create({
    username: username,
    password: password,
    fullname: fullname,
  })
    .then((newUser) => {
      res.json({ message: "Tạo mới user thành công" });
    })
    .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(409).json({message: 'Người dùng đã tồn tại'})
        }
        else {
            res.status(500).json({message: 'Lỗi server'})
        }
    });
};

export default { login, register };
