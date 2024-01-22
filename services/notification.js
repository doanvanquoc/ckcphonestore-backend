const db = require("../models");

const getNotifications = (userID) =>
  new Promise(async (resolve, reject) => {
    try {
      const notifications = await db.Notification.findAll({
        where: { userID },
      });
      if (notifications) {
        resolve({ code: 1, message: "OK", data: notifications });
      } else {
        resolve({ code: 0, message: "Người dùng không có thông báo nào" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

const addNoti = (title, content, userID) =>
  new Promise(async (resolve, reject) => {
    try {
      const noti = await db.Notification.create({
        title,
        content,
        userID,
      });
      if (noti) {
        resolve({ code: 0, message: "Thêm thông báo thành công", data: noti });
      } else {
        resolve({ code: 0, message: "Thêm thông báo thất bại" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

export default { getNotifications, addNoti };
