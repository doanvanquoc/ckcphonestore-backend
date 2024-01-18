import express from 'express'
import orderController from '../controllers/order.js'
const router = express.Router()

router.post('/create', orderController.createOrder)
router.post('/update-status', orderController.updateStatus)
router.get('/:userID', orderController.getUserOrder)

export default router