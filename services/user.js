const db = require("../models");
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const getUserById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { userID: id },
        attributes: {
          exclude: ["password"],
        },
      });
      if (user) {
        resolve({ code: 1, message: "OK", user });
      } else {
        resolve({ code: 0, message: "Không tìm thấy người dùng" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server" });
    }
  });

const updateUser = ({ userID, email, fullname, phone_number, sex, birthday }) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        const newUser = await db.User.update(
          { email, phone_number, fullname, birthday, sex },
          {
            where: { userID },
          }
        );
        const userInfo = await db.User.findOne({
          where: { userID: newUser },
          attributes: { exclude: ["password"] },
        });
        const token = jwt.sign({user: userInfo}, process.env.SECRET_KEY, {
          expiresIn: "1d",
        })
        resolve({ code: 1, message: "Cập nhật thành công", token });
      } else {
        resolve({ code: 0, message: "Email đã tồn tại" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

const changePass = ({userID,oldPass, newPass}) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { userID, password: oldPass } });
      if (user) {
        const result = await db.User.update(
          { password: newPass },
          { where: { userID } }
        );
        if (result > 0) {
          resolve({ code: 1, message: "Đổi mật khẩu thành công" });
        } else {
          resolve({ code: 0, message: "Đổi mật khẩu thất bại" });
        }
      }
      else {
        resolve({ code: 0, message: "Mật khẩu cũ không chính xác" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

export default { getUserById, updateUser, changePass };
