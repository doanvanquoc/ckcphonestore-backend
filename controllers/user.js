import userService from '../services/user.js'

const getUserByID = async (req, res) => {
    const id = req.params.id
    try {
        const user = await userService.getUserById(id)
        res.json(user)
    } catch (error) {
        res.status(500).json(error)
    }
    
}

export default {getUserByID}