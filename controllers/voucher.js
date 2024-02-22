import voucherService from '../services/voucher.js'

const checkVoucher = async (req, res) => {
    try {
        const { code } = req.body
        if (!code) {
            return res
                .status(400)
                .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
        }
        const result = await voucherService.checkVocher(code)
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export default { checkVoucher }