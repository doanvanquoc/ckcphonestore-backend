import userController from '../controllers/userController.js'
import express from 'express'

const router = express.Router()

router.get('/', userController.getUserByUserName)

export default router