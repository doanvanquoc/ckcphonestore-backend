const db = require("../models");

const getOrderDetail = (orderID, userID) =>
  new Promise(async (resolve, reject) => {
    try {
      const orderDetails = await db.OrderDetail.findAll({
        where: { orderID },
        attributes: {
          exclude: ['orderID', 'productID']
        },
        include: [
          {
            model: db.Order,
            where: { userID },
            as: "order",
            attributes: ['orderID', 'total_price', 'order_date', 'statusID']
          },
          { model: db.Product, as: "product" },
        ],
      });
      if (orderDetails && orderDetails.length > 0) {
        resolve({
          code: 1,
          message: "Lấy chi tiết đơn hàng thành công",
          data: orderDetails,
        });
      } else {
        resolve({ code: 1, message: "Không có đơn hàng này" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

export default { getOrderDetail };
