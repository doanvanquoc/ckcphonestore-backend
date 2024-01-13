import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const getUserByID = (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).json({message: 'Vui lòng điền id user'})
    }
    const user = User.findOne({
        where: {userID: id}
    }).then(user => {
        if (user) {
            res.json({message: 'Thành công', data: {
                id: user.id,
                email: user.email,
                fullname: user.fullname,
                birthday: user.birthday,
                phoneNumber: user.phoneNumber,
                avatar: user.avatar,
            }})
        }
        else {
            res.json({message: 'Không có người này'})
        }
    }).catch(err => {
        res.status(500).json({message: 'Lỗi server'})
    })
    
}

export default {getUserByID}