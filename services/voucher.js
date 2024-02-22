const db = require('../models')

const checkVocher = (code) => new Promise(async (resolve, reject) => {
    try {
        const result = await db.Voucher.findOne({ where: { code } })
        if (result) {
            resolve({ code: 1, message: 'Voucher hợp lệ', promotion: result['promotion'] })
        }
        else {
            resolve({ code: 0, message: 'Voucher không hợp lệ' })
        }
    } catch (error) {
        reject({ code: 0, message: 'Lỗi server: ', error })
    }
})

export default { checkVocher }