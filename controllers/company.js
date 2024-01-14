import companyService from '../services/company.js'

const getAllCompany = async (req, res) => {
    try {
        const result = await companyService.getAllCompany()
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export default {getAllCompany}