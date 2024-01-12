import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
  }
  User.findOne({
    where: { email: email, password: password },
  })
    .then((user) => {
      if (user) {
        var token = jwt.sign(
          {
            id: user.userID,
            email: user.email,
            fullname: user.fullname,
            birthday: user.birthday,
            phoneNumber: user.phoneNumber,
          },
          process.env.SECRECT_KEY,
          { expiresIn: 60 }
        );
        res.json({
          message: "Đăng nhập thành công",
          userID: user.userID,
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
  const { email, password, fullname, birthday, phoneNumber } = req.body;
  if (!email || !password || !fullname) {
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
  }
  User.create({
    email,
    password,
    fullname,
    birthday,
    phoneNumber
  })
    .then((newUser) => {
      res.json({ message: "Tạo mới user thành công" });
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(409).json({ message: "Người dùng đã tồn tại" });
      } else {
        res.status(500).json({ message: "Lỗi server" });
      }
    });
};

export default { login, register };
