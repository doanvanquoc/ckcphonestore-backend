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
        resolve({
          message: "Tạo mới sản phẩm thành công",
        });
      } else {
        cloudinary.uploader.destroy(file.filename);
        res.json({ message: "Tạo mới sản phẩm thất bại" });
      }
    } catch (error) {
      reject({
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
          { model: db.Company, as: "company"},
        ],
        attributes: {
          exclude: ['companyID']
        }
      });
      if (product) {
        resolve({ message: "OK", data: product });
      }
      else {
        resolve({message: 'Không tìm thấy sản phẩm nào'})
      }
    } catch (error) {
      console.log(error);
      reject({ message: "Lỗi server", error });
    }
  });

const getLatestProducts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll({
        attributes: {exclude: ['companyID']},
        include: [
          { model: db.Image, as: "images", attributes: ["image_path"] },
          { model: db.Company, as: "company" },
        ],
        limit: 5,
        order: [["post_date", "DESC"]],
      });
      if (products) {
        resolve({ message: "OK", data: products });
      } else {
        resolve({ message: "Không tìm thấy sản phẩm nào" });
      }
    } catch (error) {
      reject({ message: "Lỗi server" });
    }
  });

    //sẽ chuyển thành get product bán chạy sau
  const getAllProduct = () =>
  new Promise(async (resolve, reject) => {
    try {
      const products = await db.Product.findAll({
        attributes: {exclude: ['companyID']},
        include: [
          { model: db.Image, as: "images", attributes: ["image_path"] },
          { model: db.Company, as: "company" },
        ],
        limit: 10,
      });
      if (products) {
        resolve({ message: "OK", data: products });
      } else {
        resolve({ message: "Không tìm thấy sản phẩm nào" });
      }
    } catch (error) {
      reject({ message: "Lỗi server" });
    }
  });


export default { createProduct, getProductByCompanyID, getLatestProducts, getAllProduct };
