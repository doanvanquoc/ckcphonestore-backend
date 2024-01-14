import userController from '../controllers/user.js'
import express from 'express'

const router = express.Router()

router.get('/:id', userController.getUserByID)

export default router