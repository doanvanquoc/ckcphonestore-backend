import express from 'express'
import cartController from '../controllers/cart.js'

const router = express.Router()

router.get('/:userID', cartController.getAllProduct)

export default router