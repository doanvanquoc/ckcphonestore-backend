const db = require("../models");

const getReviewsByProductID = (productID) =>
  new Promise(async (resolve, reject) => {
    try {
      const reviews = await db.Review.findAll({
        where: { productID },
        attributes: {
          exclude: ["userID", "productID"],
        },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["userID", "email", "fullname", "avatar"],
          },
        ],
      });
      if (reviews) {
        resolve({ code: 1, message: "OK", data: reviews });
      } else {
        resolve({ code: 0, message: "Sản phẩm không có đánh giá nào" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

const createReview = (content, rating, userID, productID) =>
  new Promise(async (resolve, reject) => {
    try {
      const review = await db.Review.create({
        content,
        userID,
        productID,
        rating,
      });

      if (review) {
        resolve({ code: 0, message: "Thêm đánh giá thành công", review });
      } else {
        resolve({ code: 0, message: "Thêm đánh giá thất bại" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

export default { getReviewsByProductID, createReview };
