import orderService from "../services/order.js";

const createOrder = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await orderService.createOrder(id);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { createOrder };
