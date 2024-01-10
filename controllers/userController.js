import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const getUserByUserName = (req, res) => {
    const token = req.query.token
    if (!token) {
        return res.status(400).json({message: 'Vui lòng điền đầy đủ thông tin'})
    }
    let username
    try {
        username = jwt.verify(token, process.env.SECRECT_KEY).username
    }
    catch (err) {
        return res.status(401).json({message: 'Token hết hạn'})
    }

    User.findOne({
        where: {username: username}
    }).then(user => {
        if (user) {
            res.json({message: 'Thành công', user: {
                username: user.username,
                fullname: user.fullname
            }})
        }
        else {
            res.status(401).json({message: 'Không tìm thấy người dùng'})
        }
    }).catch (err => {
        res.status(500).json({message: 'Lỗi server'})
    })
}

export default {getUserByUserName}