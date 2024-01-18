import express from 'express'
import cartController from '../controllers/cart.js'

const router = express.Router()

router.get('/:userID', cartController.getAllProduct)
router.post('/update', cartController.updateQuantity)
router.delete('/:productID', cartController.deleteProduct)

export default router