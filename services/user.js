const db = require("../models");
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cloud from '../config/cloudinary.js'
const cloudinary = require("cloudinary").v2;
dotenv.config();
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

const updateUser = (
  { userID, email, fullname, phone_number, sex, birthday },
  file
) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { userID } });
      let avatar
      if (file) {
        avatar = file.path
      }
      if (user) {
        const updateFields = {
          ...(email && { email }),
          ...(phone_number && { phone_number }),
          ...(fullname && { fullname }),
          ...(birthday && { birthday }),
          ...(sex && { sex }),
          ...(avatar && { avatar }),
        };
        if (email) {
          if (email === user.email) {
            resolve({ code: 0, message: "Email trùng với email cũ" });
            if (file) {
              await cloudinary.uploader.destroy(file.filename);
            }
            return;
          } else {
            const user = await db.User.findOne({ where: { email } });
            if (user) {
              resolve({
                code: 0,
                message: "Email trùng với email trong hệ thống",
              });
              if (file) {
                await cloudinary.uploader.destroy(file.filename);
              }
              return;
            }
          }
        }

        await db.User.update(updateFields, { where: { userID } });
        const userInfo = await db.User.findOne({
          where: { userID },
          attributes: { exclude: ["password"] },
        });
        const token = jwt.sign({ user: userInfo }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        resolve({ code: 1, message: "Cập nhật thành công", token });
      } else {
        if (file) {
          await cloudinary.uploader.destroy(file.filename);
        }
        resolve({ code: 0, message: "User không tồn tại" });
      }
    } catch (error) {
      if (file) {
        await cloudinary.uploader.destroy(file.filename);
      }
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

const changePass = ({ userID, oldPass, newPass }) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { userID, password: oldPass },
      });
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
      } else {
        resolve({ code: 0, message: "Mật khẩu cũ không chính xác" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

export default { getUserById, updateUser, changePass };
