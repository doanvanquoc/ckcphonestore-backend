import express from 'express'
import cartController from '../controllers/cart.js'

const router = express.Router()

router.get('/:userID', cartController.getAllProduct)
router.get('/user/:userID/product/:productID', cartController.getCartByProdId)
router.post('/update', cartController.updateQuantity)
router.post('/add', cartController.addToCart)
router.delete('/:productID', cartController.deleteProduct)

export default router