import reviewService from '../services/review.js'

const getReviewsByProductID = async (req, res) => {
    const productID = req.params.id
    try {
        const result = await reviewService.getReviewsByProductID(productID)
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export default {getReviewsByProductID}