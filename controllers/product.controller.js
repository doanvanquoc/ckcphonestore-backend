import uploadCloud from "../config/cloudinary.js";
import Image from "../models/image.model.js";
import Product from "../models/product.model.js";
import createImage from "./image.controller.js";
const cloudinary = require('cloudinary').v2;

const createProduct = (req, res) => {
  const {
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
  } = req.body;


  if (
    !product_name ||
    !price ||
    !description ||
    !quantity ||
    !companyID ||
    !screen_size ||
    !os ||
    !cpu ||
    !ram ||
    !internal_storage ||
    !main_cam_resolution ||
    !front_cam_resolution ||
    !battery ||
    !weight ||
    !post_date
  ) {
    cloudinary.uploader.destroy(req.file.filename)
    return res.json({ message: "Vui lòng điền đầy đủ thông tin" });
  }

  Product.create({
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
  }).then(product => {
    if (product) {
      createImage(req.file.path, product.productID)
      res.json({message: 'Tạo mới sản phẩm thành công'})
    }
    else {
      cloudinary.uploader.destroy(req.file.filename)
      res.json({message: 'Tạo mới sản phẩm thất bại'})
    }
  }).catch(err => {
    res.status(500).json({message: 'Lỗi server'})
  });
};

const getProductByID = (req, res) => {
  const id = req.params.id;
  Product.findOne({
    where: { productID: id },
    include: Image,
  })
    .then((product) => {
      if (product) {
        res.json({ message: "OK", data: product });
      } else {
        res.json({ message: "Không tìm thấy sản phẩm" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Lỗi serrver", err });
    });
};

const getNewProducts = (req, res) => {
  Product.findAll({
    include: Image, // Liên kết với bảng Image
    order: [["post_date", "DESC"]], // Sắp xếp theo post_date giảm dần
  })
    .then((products) => {
      if (products) {
        res.json({ message: "OK", products });
      } else {
        res.json({ message: "Không tìm thấy sản phẩm nào" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Lỗi server" });
    });
};

export default { getProductByID, getNewProducts, createProduct };
