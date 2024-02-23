import orderService from "../services/order.js";

const createOrder = async (req, res) => {
  const { id, promotion } = req.body;
  if (!id || promotion == null) {
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await orderService.createOrder(id, promotion);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserOrder = async (req, res) => {
  const userID = req.params.userID;
  if (!userID) {
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await orderService.getUserOrder(userID);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateStatus = async (req, res) => {
  const { orderID, statusID } = req.body;
  if (!orderID || !statusID) {
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  const result = await orderService.updateStatus(orderID, statusID);
  res.json(result);
  try {
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { createOrder, getUserOrder, updateStatus };
