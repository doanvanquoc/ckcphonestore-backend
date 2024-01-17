const db = require("../models");

const createOrder = (userID) =>
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
        const total_price = carts.reduce((total, cart) => {
          return total + cart.quantity * cart.product.price;
        }, 0);

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
          resolve({ code: 1, message: "Tạo mới đơn hàng thành công", order });
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
        include: [{ model: db.Status, as: "status" }],
      });
      if (result && result.length > 0) {
        resolve({
          code: 1,
          message: "Lấy thông tin đơn hàng thành công",
          data: result,
        });
      }
      else {
        resolve({code: 0, message: 'Người dùng không có đơn hàng nào'})
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

export default { createOrder, getUserOrder };
