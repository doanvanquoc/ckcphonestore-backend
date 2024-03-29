import express from 'express'
import addressController from '../controllers/address.js'

const router = express.Router()

router.get('/:userID', addressController.getUserAddresses)
router.post('/add', addressController.addAddress)

export default router