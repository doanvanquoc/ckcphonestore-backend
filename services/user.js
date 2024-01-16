const db = require("../models");
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
        resolve({ code: 1, message: "Cập nhật thành công", userInfo });
      } else {
        resolve({ code: 0, message: "Email đã tồn tại" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

const changePass = (userID, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await db.User.update({ password }, { where: { userID } });
      if (result > 0) {
        resolve({ code: 1, message: "Đổi mật khẩu thành công" });
      } else {
        resolve({ code: 1, message: "Đổi mật khẩu thất bại" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

export default { getUserById, updateUser, changePass };
