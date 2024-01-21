const db = require("../models");

const getUserAddresses = (userID) =>
  new Promise(async (resolve, reject) => {
    try {
      const addresses = await db.Address.findAll({
        where: { userID },
        attributes: { exclude: ["userID"] },
      });
      if (addresses && addresses.length > 0) {
        resolve({
          code: 1,
          message: "Lấy địa chỉ thành công",
          data: addresses,
        });
      } else {
        resolve({ code: 0, message: "Người dùng chưa có địa chỉ" });
      }
    } catch (error) {
      reject({ code: 1, message: "Lỗi server", error });
    }
  });

const addAddress = (userID, address, name) =>
  new Promise(async (resolve, reject) => {
    try {
      const newAddress = await db.Address.create({
        address,
        userID,
        name
      });
      if (address) {
        resolve({ code: 1, message: "Thêm địa chỉ thành công", data: newAddress });
      } else {
        resolve({ code: 0, message: "Thêm địa chỉ thất bại" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

export default { getUserAddresses, addAddress };
