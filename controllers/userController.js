import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const getUserInfoByToken = (req, res) => {
    const token = req.query.token
    if (!token) {
        return res.status(400).json({message: 'Vui lòng điền đầy đủ thông tin'})
    }
    let user
    try {
        user = jwt.verify(token, process.env.SECRECT_KEY)
        console.log(user)
    }
    catch (err) {
        return res.status(401).json({message: err})
    }
    res.json({message: 'Thành công', user: user})
}

export default {getUserInfoByToken}