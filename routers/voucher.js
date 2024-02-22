import express from "express";
import voucherController from "../controllers/voucher.js";
const router = express.Router();

router.post('/', voucherController.checkVoucher)

export default router;
