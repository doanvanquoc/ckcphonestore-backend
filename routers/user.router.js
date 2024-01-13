import userController from '../controllers/user.controller.js'
import express from 'express'

const router = express.Router()

router.get('/:id', userController.getUserByID)

export default router