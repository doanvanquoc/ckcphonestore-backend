import express from 'express'
import orderDetailController from '../controllers/order_detail.js'

const router = express.Router()

router.get('/:orderID/user/:userID', orderDetailController.getOrderDetail)

export default router