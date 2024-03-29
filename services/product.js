const db = require("../models");
const cloudinary = require("cloudinary").v2;

const createProduct = (
  {
    product_name,
    price,
    description,
    quantity,
    companyID,
    screen_size,
    os,
    cpu,
    ram,
    internal_storage,
    main_cam_resolution,
    front_cam_resolution,
    battery,
    weight,
    post_date,
  },
  file
) =>
  new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.create({
        product_name,
        price,
        description,
        quantity,
        companyID,
        screen_size,
        os,
        cpu,
        ram,
        internal_storage,
        main_cam_resolution,
        front_cam_resolution,
        battery,
        weight,
        post_date,
      });
      if (product) {
        await db.Image.create({
          image_path: file.path,
          productID: product.productID,
        });
        resolve({ code: 1, message: "Tạo mới sản phẩm thành công" });
      } else {
        cloudinary.uploader.destroy(file.filename);
        res.json({ code: 0, message: "Tạo mới sản phẩm thất bại" });
      }
    } catch (error) {
      reject({
        code: 0,
        message: "Lỗi server",
      });
    }
  });

const getProductByCompanyID = (companyID) =>
  new Promise(async (resolve, reject) => {
    try {
      const product = await db.Product.findAll({
        where: { companyID, quantity: { [db.Sequelize.Op.gt]: 0 } },

        include: [
          { model: db.Image, as: "images", attributes: ["image_path"] },
          { model: db.Company, as: "company" },
        ],
        attributes: {
          exclude: ["companyID"],
        },
      });
      if (product) {
        resolve({ code: 1, message: "OK", data: product });
      } else {
        resolve({ code: 0, message: "Không tìm thấy sản phẩm nào" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

  const getLatestProductsByCompanyID = (companyID) =>
  new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll({
        where: { quantity: { [db.Sequelize.Op.gt]: 0 }, companyID },
        attributes: [
          "productID",
          "product_name",
          "price",
          "description",
          "quantity",
          "screen_size",
          "os",
          "cpu",
          "ram",
          "internal_storage",
          "main_cam_resolution",
          "front_cam_resolution",
          "battery",
          "weight",
          "post_date",
          [
            db.sequelize.literal(
              "(SELECT SUM(orderDetails.quantity) FROM orderDetails WHERE orderDetails.productID = Product.productID)"
            ),
            "TongBan",
          ],
          [
            db.sequelize.literal(
              "(SELECT AVG(rating) FROM reviews WHERE reviews.productID = Product.productID)"
            ),
            "avg_rating",
          ],
        ],
        include: [
          { model: db.Image, as: "images", attributes: ["image_path"] },
          { model: db.Company, as: "company" },
        ],
        order: [["post_date", "DESC"]],
      });
      if (products) {
        resolve({ code: 1, message: "OK", data: products });
      } else {
        resolve({ code: 0, message: "Không tìm thấy sản phẩm nào" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server" });
    }
  });

const getLatestProducts = (limit) =>
  new Promise(async (resolve, reject) => {
    const parsedLimit = parseInt(limit, 10);
    try {
      const products = await db.Product.findAll({
        where: { quantity: { [db.Sequelize.Op.gt]: 0 } },
        attributes: [
          "productID",
          "product_name",
          "price",
          "description",
          "quantity",
          "screen_size",
          "os",
          "cpu",
          "ram",
          "internal_storage",
          "main_cam_resolution",
          "front_cam_resolution",
          "battery",
          "weight",
          "post_date",
          [
            db.sequelize.literal(
              "(SELECT SUM(orderDetails.quantity) FROM orderDetails WHERE orderDetails.productID = Product.productID)"
            ),
            "TongBan",
          ],
          [
            db.sequelize.literal(
              "(SELECT AVG(rating) FROM reviews WHERE reviews.productID = Product.productID)"
            ),
            "avg_rating",
          ],
        ],
        include: [
          { model: db.Image, as: "images", attributes: ["image_path"] },
          { model: db.Company, as: "company" },
        ],
        limit: parsedLimit || 100,
        order: [["post_date", "DESC"]],
      });
      if (products) {
        resolve({ code: 1, message: "OK", data: products });
      } else {
        resolve({ code: 0, message: "Không tìm thấy sản phẩm nào" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

//sẽ chuyển thành get product bán chạy sau
const getAllProduct = () =>
  new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll({
        where: { quantity: { [db.Sequelize.Op.gt]: 0 } },
        attributes: [
          "productID",
          "product_name",
          "price",
          "description",
          "quantity",
          "screen_size",
          "os",
          "cpu",
          "ram",
          "internal_storage",
          "main_cam_resolution",
          "front_cam_resolution",
          "battery",
          "weight",
          "post_date",
          [
            db.sequelize.literal(
              "(SELECT SUM(orderDetails.quantity) FROM orderDetails WHERE orderDetails.productID = Product.productID)"
            ),
            "TongBan",
          ],
          [
            db.sequelize.literal(
              "(SELECT AVG(rating) FROM reviews WHERE reviews.productID = Product.productID)"
            ),
            "avg_rating",
          ],
        ],
        include: [
          { model: db.Image, as: "images", attributes: ["image_path"] },
          { model: db.Company, as: "company" },
        ],
        order: [["post_date", "DESC"]],
      });
      if (products) {
        resolve({ code: 1, message: "OK", data: products });
      } else {
        resolve({ code: 0, message: "Không tìm thấy sản phẩm nào" });
      }
    } catch (error) {
      reject({ code: 0, message: "Lỗi server" });
    }
  });

const getBestSellingProducts = (limit) =>
  new Promise(async (resolve, reject) => {
    const parsedLimit = parseInt(limit, 10);
    try {
      const bestSellingProducts = await db.Product.findAll({
        where: { quantity: { [db.Sequelize.Op.gt]: 0 } },
        attributes: [
          "productID",
          "product_name",
          "price",
          "description",
          "quantity",
          "screen_size",
          "os",
          "cpu",
          "ram",
          "internal_storage",
          "main_cam_resolution",
          "front_cam_resolution",
          "battery",
          "weight",
          "post_date",
          [
            db.sequelize.literal(
              "(SELECT SUM(orderDetails.quantity) FROM orderDetails WHERE orderDetails.productID = Product.productID)"
            ),
            "TongBan",
          ],
          [
            db.sequelize.literal(
              "(SELECT AVG(rating) FROM reviews WHERE reviews.productID = Product.productID)"
            ),
            "avg_rating",
          ],
        ],
        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["image_path"],
          },
          {
            model: db.Company,
            as: "company", // Thêm các trường bạn muốn chọn từ bảng Company
          },
        ],
        group: ["Product.productID"],
        order: [[db.sequelize.literal("TongBan"), "DESC"]],
        limit: parsedLimit || 100,
      });

      resolve({ code: 1, message: "OK", data: bestSellingProducts });
    } catch (error) {
      console.error(error);
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

  const getBestSellingProductsByCompanyID = (companyID, limit) =>
  new Promise(async (resolve, reject) => {
    const parsedLimit = parseInt(limit, 10);
    try {
      const bestSellingProducts = await db.Product.findAll({
        where: { companyID, quantity: { [db.Sequelize.Op.gt]: 0 } },
        attributes: [
          "productID",
          "product_name",
          "price",
          "description",
          "quantity",
          "screen_size",
          "os",
          "cpu",
          "ram",
          "internal_storage",
          "main_cam_resolution",
          "front_cam_resolution",
          "battery",
          "weight",
          "post_date",
          [
            db.sequelize.literal(
              "(SELECT SUM(orderDetails.quantity) FROM orderDetails WHERE orderDetails.productID = Product.productID)"
            ),
            "TongBan",
          ],
          [
            db.sequelize.literal(
              "(SELECT AVG(rating) FROM reviews WHERE reviews.productID = Product.productID)"
            ),
            "avg_rating",
          ],
        ],
        include: [
          {
            model: db.Image,
            as: "images",
            attributes: ["image_path"],
          },
          {
            model: db.Company,
            as: "company", // Thêm các trường bạn muốn chọn từ bảng Company
          },
        ],
        group: ["Product.productID"],
        order: [[db.sequelize.literal("TongBan"), "DESC"]],
        limit: parsedLimit || 100,
      });

      resolve({ code: 1, message: "OK", data: bestSellingProducts });
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });


const getProductsByReviewUser = (userID) =>
  new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll({
        attributes: {
          exclude: ["Reviews", "companyID"],
        },
        include: [{ model: db.Review, where: { userID }, raw: true }, {
          model: db.Image, as: 'images', attributes: ['image_path']
        }, {model: db.Company, as: 'company'}],
      });
      const uniqueReviewedProducts = Array.from(
        new Set(products.map((product) => product.productID))
      ).map((productID) =>
        products.find((product) => product.productID === productID)
      );
      resolve({ code: 1, message: "OK", data: uniqueReviewedProducts });
    } catch (error) {
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

export default {
  createProduct,
  getProductByCompanyID,
  getLatestProducts,
  getAllProduct,
  getBestSellingProducts,
  getBestSellingProductsByCompanyID,
  getProductsByReviewUser,
  getLatestProductsByCompanyID
};
