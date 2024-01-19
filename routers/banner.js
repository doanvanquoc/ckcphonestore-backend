import express from 'express'
import bannerController from '../controllers/banner.js'

const router = express.Router()

router.get('/', bannerController.getBanners)

export default router