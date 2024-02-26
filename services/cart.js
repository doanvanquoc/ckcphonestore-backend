import { where } from "sequelize";

const db = require("../models");

const getAllProduct = (userID) =>
  new Promise(async (resolve, reject) => {
    try {
      const carts = await db.Cart.findAll({
        where: { userID },
        include: [
          {
            model: db.Product,
            as: "product",
            include: [
              { model: db.Company, as: "company" },
              { model: db.Image, as: "images", attributes: ["image_path"] },
            ],
          },
        ],
        attributes: {
          exclude: ["userID", "productID"],
        },
      });
      if (carts) {
        resolve({ code: 1, message: "OK", data: carts });
      } else {
        resolve({ code: 0, message: "Không có sản phẩm nào trong giỏ hàng" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

const deleteProduct = (productID) =>
  new Promise(async (resolve, reject) => {
    try {
      const prod = await db.Cart.findOne({ where: { productID } });
      if (!prod) {
        resolve({ code: 0, message: "Không có sản phẩm này trong giỏ hàng" });
        return;
      }

      const result = await db.Cart.destroy({ where: { productID } });
      await db.Product.update(
        { quantity: Sequelize.literal(`quantity + ${prod.quantity}`) },
        { where: { productID } }
      );

      if (result > 0) {
        resolve({ code: 1, message: "Xóa sản phẩm khỏi giỏ hàng thành công" });
      } else {
        resolve({ code: 0, message: "Không có sản phẩm này trong giỏ hàng" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });


const updateQuantity = (cartID, quantity) =>
  new Promise(async (resolve, reject) => {
    try {
      const rows = await db.Cart.update({ quantity }, { where: { cartID } });
      if (rows > 0) {
        resolve({ code: 1, message: "Cập nhật thành công" });
      } else {
        resolve({ Code: 0, message: "Cập nhật thất bại" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

const addToCart = (userID, productID, quantity) =>
  new Promise(async (resolve, reject) => {
    const intQuantity = parseInt(quantity, 10);
    try {
      const existingCartItem = await db.Cart.findOne({
        where: { productID, userID },
      });

      if (existingCartItem) {
        const updatedRows = await db.Cart.update(
          { quantity: db.sequelize.literal(`quantity + ${intQuantity}`) },
          { where: { cartID: existingCartItem.cartID } }
        );

        if (updatedRows > 0) {
          resolve({
            code: 1,
            message: "Thêm sản phẩm vào giỏ hàng thành công",
          });
        } else {
          resolve({ code: 0, message: "Thêm sản phẩm vào giỏ hàng thất bại" });
        }
      } else {
        const cart = await db.Cart.create({
          userID,
          productID,
          quantity: intQuantity,
        });

        if (cart) {
          resolve({
            code: 1,
            message: "Thêm sản phẩm vào giỏ hàng thành công",
            data: cart,
          });
        } else {
          resolve({ code: 0, message: "Thêm thất bại" });
        }
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

const getCartByProdId = (productID, userID) => new Promise(async (resolve, reject) => {
  try {
    const cart = await db.Cart.findOne({
      where: { productID, userID }, include: [
        {
          model: db.Product,
          as: "product",
          include: [
            { model: db.Company, as: "company" },
            { model: db.Image, as: "images", attributes: ["image_path"] },
          ],
        },
      ],
      attributes: {
        exclude: ["userID", "productID"],
      },
    })
    if (cart) {
      resolve({ code: 1, message: 'OK', data: cart })
    }
    else {
      resolve({ code: 0, message: 'Không có sản phẩm này trong giỏ hàng' })
    }
  } catch (error) {
    reject({ code: 0, message: 'Lỗi server: ', error })
  }
})


export default { getAllProduct, deleteProduct, updateQuantity, addToCart, getCartByProdId };
