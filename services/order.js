const db = require("../models");
import { io } from "../index.js";
import admin from "../config/firebase.js";

const createOrder = (userID, promotion) =>
  new Promise(async (resolve, reject) => {
    try {
      //Lấy danh sách giỏ hàng theo user ID
      const carts = await db.Cart.findAll({
        where: { userID },
        attributes: {
          exclude: ["userID", "productID"],
        },
        include: [{ model: db.Product, as: "product" }],
      });

      if (carts && carts.length > 0) {
        //Tính tổng giá tiền
        const total_price = (carts.reduce((total, cart) => {
          return total + cart.quantity * cart.product.price;
        }, 0) * 0.9 + 50) * (0.01 * (100 - promotion));

        //Tạo mới đơn hàng
        const order = await db.Order.create({
          total_price: total_price,
          userID: userID,
          statusID: 1,
        });
        if (order) {
          for (const cart of carts) {
            await db.OrderDetail.create({
              orderID: order.orderID,
              quantity: cart.quantity,
              productID: cart.product.productID,
              price: cart.product.price,
            });
            await db.Product.update(
              { quantity: cart.product.quantity - cart.quantity },
              { where: { productID: cart.product.productID } }
            );
          }
          await db.Cart.destroy({ where: { userID } });
          const newOrder = await db.Order.findOne({
            where: { userID, orderID: order.orderID },
            attributes: {
              exclude: ["statusID"],
            },
            include: [
              { model: db.Status, as: "status" },
              {
                model: db.OrderDetail,
                as: "orderDetails",
                attributes: ["orderDetailID", "quantity"],
                include: {
                  model: db.Product,
                  as: "product",
                  include: [
                    { model: db.Company, as: "company" },
                    { model: db.Image, as: "images", attributes: ["image_path"] },
                  ],
                },
              },
            ],
          });

          resolve({ code: 1, message: "Tạo mới đơn hàng thành công", order: newOrder });
        } else {
          resolve({ code: 0, message: "Không tạo được đơn hàng" });
        }
      } else {
        resolve({ code: 0, message: "Người dùng không có gì trong giỏ hàng" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

  

const getUserOrder = (userID) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await db.Order.findAll({
        where: { userID },
        attributes: {
          exclude: ["statusID"],
        },
        include: [
          { model: db.Status, as: "status" },
          {
            model: db.OrderDetail,
            as: "orderDetails",
            attributes: ["orderDetailID", "quantity"],
            include: {
              model: db.Product,
              as: "product",
              include: [
                { model: db.Company, as: "company" },
                { model: db.Image, as: "images", attributes: ["image_path"] },
              ],
            },
          },
        ],
      });
      if (result && result.length > 0) {
        resolve({
          code: 1,
          message: "Lấy thông tin đơn hàng thành công",
          data: result,
        });
      } else {
        resolve({ code: 0, message: "Người dùng không có đơn hàng nào" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

const updateStatus = (orderID, statusID) =>
  new Promise(async (resolve, reject) => {
    try {
      const rows = await db.Order.update({ statusID }, { where: { orderID } });
      if (rows > 0) {
        const order = await db.Order.findOne({where:{orderID}})
        io.emit("order_updated", order.userID);
        resolve({
          code: 1,
          message: "Cập nhật trạng thái đơn hàng thành công",
          userID: order.userID
        });
      } else {
        resolve({ code: 0, message: "Cập nhật trạng thái đơn hàng thất bại" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

export default { createOrder, getUserOrder, updateStatus };
