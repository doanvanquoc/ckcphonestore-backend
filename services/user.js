const db = require('../models')
const getUserById = (id) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOne({
            where: {userID: id},
            attributes: {
                exclude: ['password']
            }
        })
        if (user) {
            resolve({message: 'OK', user})
        }
        else {
            resolve({message: 'Không tìm thấy người dùng'})
        }
    } catch (error) {
        reject({message: 'Lỗi server'})
    }
})

export default {getUserById}