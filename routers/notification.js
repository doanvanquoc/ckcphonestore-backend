import express from 'express'
import notificationController from '../controllers/notification.js'

const router = express.Router()

router.get('/:userID', notificationController.getNotifications)
router.post('/add', notificationController.addNoti)

export default router