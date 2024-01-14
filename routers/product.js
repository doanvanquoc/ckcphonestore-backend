import express from 'express'
import productController from '../controllers/product.js'
const uploadCloud = require('../config/cloudinary.js')


const router = express.Router()

router.get('/news', productController.getNewProducts)
router.get('/:companyID', productController.getProductByCompanyID)
router.post('/create', uploadCloud.single('image'), productController.createProduct)


export default router