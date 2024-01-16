import reviewService from "../services/review.js";

const getReviewsByProductID = async (req, res) => {
  const productID = req.params.id;
  if (!productID) {
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await reviewService.getReviewsByProductID(productID);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getReviewsByProductID };
