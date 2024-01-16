import express from 'express'
import authController from '../controllers/auth.js'
import cloud from '../config/cloudinary.js'

const router = express.Router()

router.post('/login', authController.login)
router.post('/check', authController.checkEmail)
router.post('/verify', authController.verifyToken)
router.post('/register', cloud.uploadAvatar.single('avatar'), authController.register)

export default router