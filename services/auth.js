const db = require("../models");
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const cloudinary = require("cloudinary").v2;

const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email, password },
        include: [{model: db.Address, as: 'addresses'}],
        attributes: {
          exclude: ["password"],
        },
      });
      console.log(user);
      if (user) {
        const token = jwt.sign({ user }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        resolve({ code: 1, message: "OK", token });
      } else {
        resolve({
          code: 0,
          message: "Tài khoản hoặc mật khẩu không chính xác",
        });
      }
    } catch (error) {
      reject({ code: 0, message: `Lỗi server: ${error}` });
    }
  });
const register = (userData) =>
  new Promise(async (resolve, reject) => {
    try {
      const { email, password, fullname, birthday, phone_number, sex, file } =
        userData;

      const check = await db.User.findOne({
        where: { email },
      });

      if (check) {
        if (file) {
          cloudinary.uploader.destroy(file.filename);
        }
        resolve({ code: 0, message: "Email đã tồn tại" });
      } else {
        const avatarPath = file
          ? file.path
          : "https://res.cloudinary.com/dxe8ykmrn/image/upload/v1705375410/user-avatar/tgaudfhwukm4c6gm0zzy.jpg";

        const user = await db.User.create(
          {
            email,
            password,
            fullname,
            birthday,
            phone_number,
            avatar: avatarPath,
            sex,
          }
        );

        if (user) {
          const token = jwt.sign(
            {
              user: {
                id: user.userID,
                email: user.email,
                fullname: user.fullname,
                birthday: user.birthday,
                phone_number: user.phone_number,
                avatar: user.avatar,
                sex: user.sex,
              },
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "1d",
            }
          );
          resolve({ code: 1, message: "OK", token });
        } else {
          if (file) {
            cloudinary.uploader.destroy(file.filename);
          }
          resolve({ code: 0, message: "Không thể tạo mới người dùng" });
        }
      }
    } catch (error) {
      if (userData.file) {
        cloudinary.uploader.destroy(userData.file.filename);
      }
      reject({ code: 0, message: `Lỗi server: ${error}` });
    }
  });

const checkEmail = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email },
      });
      if (user) {
        resolve({ code: 0, message: "Email đã tồn tại" });
      } else {
        resolve({ code: 1, message: "Email chưa tồn tại" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

export default { login, register, checkEmail };
