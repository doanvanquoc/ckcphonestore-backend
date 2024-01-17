import express from 'express'
import orderController from '../controllers/order.js'
const router = express.Router()

router.post('/create', orderController.createOrder)
router.get('/:userID', orderController.getUserOrder)

export default router