const db = require('../models')

const getAllProduct = (userID) => new Promise(async (resolve, reject) => {
    try {
        const carts = await db.Cart.findAll({
            where: {userID},
            include: [{model: db.Product, as: "product"}],
            attributes: {
                exclude: ['userID', 'productID', 'cartID']
            }
        })
        if (carts) {
            resolve({code: 1, message: 'OK', data: carts})
        }
        else {
            resolve({code: 0, message: 'Không có sản phẩm nào trong giỏ hàng'})
        }
    } catch (error) {
        reject({code: 0, message: 'Lỗi server', error})
    }
})

export default {getAllProduct}