import cartService from '../services/cart.js'

const getAllProduct = async (req, res) => {
    const userID = req.params.userID
    if (!userID) {
        return res.status(400).json({code:0,message: 'Vui lòng điền đầy đủ thông tin'})
    }
    try {
        const result = await cartService.getAllProduct(userID)
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteProduct = async (req, res) => {
    const productID = req.params.productID
    if (!productID) {
        return res.status(400).json({code:0,message: 'Vui lòng điền đầy đủ thông tin'})
    }
    try {
        const result = await cartService.deleteProduct(productID)
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export default {getAllProduct, deleteProduct}