const cloudinary = require("cloudinary").v2;
import productService from "../services/product.js";

const createProduct = async (req, res) => {
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
    cloudinary.uploader.destroy(req.file.filename);
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await productService.createProduct(req.body, req.file);
    res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getProductByCompanyID = async (req, res) => {
  const companyID = req.params.companyID;
  if (!companyID) {
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const product = await productService.getProductByCompanyID(companyID);
    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getLatestProducts = async (req, res) => {
  const limit = req.query.limit
  try {
    const products = await productService.getLatestProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await productService.getAllProduct();
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBestSellingProducts = async (req, res) => {
  const limit = req.query.limit
  try {
    const result = await productService.getBestSellingProducts(limit);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBestSellingProductsByCompanyID = async (req, res) => {
  const companyID = req.params.companyID
  const limit = req.query.limit
  if(!companyID) {
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await productService.getBestSellingProductsByCompanyID(companyID, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductsByReviewUser = async (req, res) => {
  const userID = req.params.userID
  if(!userID){
    return res
    .status(400)
    .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await productService.getProductsByReviewUser(userID)
    res.json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

export default {
  getProductByCompanyID,
  getLatestProducts,
  createProduct,
  getAllProduct,
  getBestSellingProducts,
  getBestSellingProductsByCompanyID,
  getProductsByReviewUser
};
