import express from 'express'
import productController from '../controllers/product.js'
import cloud from '../config/cloudinary.js'


const router = express.Router()

router.get('/all', productController.getAllProduct)
router.get('/best-sell', productController.getBestSellingProducts)
router.get('/best-sell/:companyID', productController.getBestSellingProductsByCompanyID)
router.get('/review/:userID', productController.getProductsByReviewUser)
router.get('/latest', productController.getLatestProducts)
router.get('/:companyID', productController.getProductByCompanyID)
router.post('/create', cloud.uploadProductImage.single('image'), productController.createProduct)


export default router