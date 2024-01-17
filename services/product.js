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
        where: { companyID },
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
      console.log(error);
      reject({ code: 0, message: "Lỗi server", error });
    }
  });

const getLatestProducts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll({
        attributes: { exclude: ["companyID"] },
        include: [
          { model: db.Image, as: "images", attributes: ["image_path"] },
          { model: db.Company, as: "company" },
        ],
        limit: 5,
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

//sẽ chuyển thành get product bán chạy sau
const getAllProduct = () =>
  new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll({
        attributes: { exclude: ["companyID"] },
        include: [
          { model: db.Image, as: "images", attributes: ["image_path"] },
          { model: db.Company, as: "company" },
        ],
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

export default {
  createProduct,
  getProductByCompanyID,
  getLatestProducts,
  getAllProduct,
};
