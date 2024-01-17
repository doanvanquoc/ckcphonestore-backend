import orderDetailService from "../services/order_detail.js";

const getOrderDetail = async (req, res) => {
  const {orderID, userID} = req.params;
  if (!orderID || !userID) {
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await orderDetailService.getOrderDetail(orderID, userID);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getOrderDetail };
