const db = require('../models')

const getAllProduct = (userID) => new Promise(async (resolve, reject) => {
    try {
        const carts = await db.Cart.findAll({
            where: {userID},
            include: [{model: db.Product, as: "product", include: [{model: db.Company, as: 'company'}, {model: db.Image, as: 'images',attributes: ["image_path"]}]}, ],
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

const deleteProduct = (productID) => new Promise(async (resolve, reject) => {
    try {
        const result = await db.Cart.destroy({where: {productID}})
        console.log(result)
        if (result > 0) {
            resolve({code: 1, message: 'Xóa sản phẩm khỏi giỏ hàng thành công'})
        }
        else {
            resolve({code: 0, message: 'Không có sản phẩm này trong giỏ hàng'})
        }
    } catch (error) {
        reject({code: 0, message: 'Lỗi server', error})
    }
})

export default {getAllProduct, deleteProduct}