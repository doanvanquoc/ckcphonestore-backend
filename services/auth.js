const db = require("../models");
import jwt from "jsonwebtoken";
import { raw } from "mysql2";
import { where } from "sequelize";

const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email, password },
        attributes: {
          exclude: ["password"],
        },
      });
      if (user) {
        const token = jwt.sign({ user }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        resolve({ message: "OK", token });
      } else {
        resolve({ message: "Tài khoản hoặc mật khẩu không chính xác" });
      }
    } catch (error) {
      reject({ message: `Lỗi server: ${error}` });
    }
  });

const register = ({
  email,
  password,
  fullname,
  birthday,
  phone_number,
  avatar,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const check = await db.User.findOne({
        where: { email },
      });
      if (check) {
        resolve({ message: "Email đã tồn tại" });
      } else {
        const user = await db.User.create({
          email,
          password,
          fullname,
          birthday,
          phone_number,
          avatar,
        });
        if (user) {
          console.log(user);
          resolve({ message: "OK", user: user });
        } else {
          resolve({ message: "Không thể tạo mới người dùng" });
        }
      }
    } catch (error) {
      reject({ message: `Lỗi server: ${error}` });
    }
  });

export default { login, register };
