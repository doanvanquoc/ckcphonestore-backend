const db = require('../models')

const getAllCompany = () => new Promise(async (resolve, reject) => {
    try {
        const companies = await db.Company.findAll()
        if (companies) {
            resolve({message: 'OK', companies})
        }
        else {
            resolve({message: 'Không có công ty nào'})
        }
    } catch (error) {
        reject({message: 'Lỗi server',error})
    }
})

export default {getAllCompany}