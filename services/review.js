const db = require('../models')

const getReviewsByProductID = (productID) => new Promise(async (resolve, reject) => {
    try {
        const reviews = await db.Review.findAll({
            where: {productID},
            attributes: {
                exclude: ['userID', 'productID']
            },
            include: [
                {model: db.User, as: 'user', attributes: ['userID', 'email', 'fullname', 'avatar']}
            ]
        })
        if (reviews) {
            resolve({message: 'OK', data: reviews})
        }
        else {
            resolve({message: 'Sản phẩm không có đánh giá nào'})
        }
    } catch (error) {
        reject({message: 'Lỗi server', error})
    }
})

export default {getReviewsByProductID}