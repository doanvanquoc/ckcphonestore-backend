const db = require("../models");

const getBanners = () =>
  new Promise(async (resolve, reject) => {
    try {
      const banners = await db.Banner.findAll();
      if (banners && banners.length > 0) {
        resolve({
          code: 1,
          message: "Lấy danh sách banner thành công",
          data: banners,
        });
      } else {
        resolve({ code: 0, message: "Lấy danh sách banner thất bại" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

export default { getBanners };
