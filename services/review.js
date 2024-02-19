import { where } from "sequelize";

const db = require("../models");

const getReviewsByProductID = (productID) =>
  new Promise(async (resolve, reject) => {
    try {
      const reviews = await db.Review.findAll({
        where: { productID },
        attributes: {
          exclude: ["userID"],
        },
        include: [
          {
            model: db.User,
            as: "user",
            include: [{model: db.Address, as: 'addresses'}]
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

const updateReview = (content, rating, userID, productID) =>
  new Promise(async (resolve, reject) => {
    try {
      const rows = await db.Review.update(
        {
          content,
          rating,
        },
        { where: { userID, productID } }
      );
      console.log(rows);

      if (rows > 0) {
        resolve({ code: 0, message: "Cập nhật đánh giá thành công" });
      } else {
        resolve({ code: 0, message: "Cập nhật đánh giá thất bại" });
      }
    } catch (error) {
      console.error("Lỗi chi tiết:", error);
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

const getReviewsByProductIDAndUserID = (productID, userID) =>
  new Promise(async (resolve, reject) => {
    try {
      const reviews = await db.Review.findOne({
        where: { productID, userID },
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

export default {
  getReviewsByProductID,
  createReview,
  getReviewsByProductIDAndUserID,
  updateReview
};
