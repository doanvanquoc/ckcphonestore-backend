import User from "../models/user.model.js";
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
            phone_number: user.phoneNumber,
            avatar: user.avatar
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
      res.status(500).json({ meaasge: "Lỗi server: ", err });
    });
};

const register = (req, res) => {
  const { email, password, fullname, birthday, phoneNumber: phone_number, avatar } = req.body;
  if (!email || !password || !fullname || !phone_number || !avatar) {
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
  }
  User.create({
    email,
    password,
    fullname,
    birthday,
    phone_number: phone_number,
    avatar
  })
    .then((newUser) => {
      var token = jwt.sign(
        {
          id: newUser.userID,
          email: newUser.email,
          fullname: newUser.fullname,
          birthday: newUser.birthday,
          phone_number: newUser.phone_number,
          avatar: newUser.avatar
        },
        process.env.SECRECT_KEY,
        { expiresIn: 60 }
      );
      res.json({ message: "Tạo mới user thành công", token });
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
