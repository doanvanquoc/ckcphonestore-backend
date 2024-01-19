import bannerService from '../services/banner.js'

const getBanners = async (req, res) => {
    try {
        const result = await bannerService.getBanners()
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export default {getBanners}