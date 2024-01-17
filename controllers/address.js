import addressService from '../services/address.js'

const getUserAddresses = async (req, res) => {
    const userID = req.params.userID
    if (!userID) {
        return res.status(400).json({code:0, message: 'Vui lòng điền đầy đủ thông tin'})
    }
    try {
        const result = await addressService.getUserAddresses(userID)
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const addAddress = async (req, res) => {
    try {
        const {userID, address} = req.body
        if (!userID || !address) {
            return res.status(400).json({code:0, message: 'Vui lòng điền đầy đủ thông tin'})
        }
        const result = await addressService.addAddress(userID, address)
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export default {getUserAddresses, addAddress}