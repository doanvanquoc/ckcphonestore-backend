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

const getReviewsByProductIDAndUserID = async (req, res) => {
  const productID = req.params.productID;
  const userID = req.params.userID;
  if (!productID || !userID) {
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await reviewService.getReviewsByProductIDAndUserID(productID, userID);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createReview = async (req, res) => {
  const { content, rating, userID, productID } = req.body;
  if (!content || !rating || !userID || !productID) {
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await reviewService.createReview(
      content,
      rating,
      userID,
      productID
    );
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateReview = async (req, res) => {
  const { content, rating, userID, productID } = req.body;
  if (!content || !rating || !userID || !productID) {
    return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const result = await reviewService.updateReview(
      content,
      rating,
      userID,
      productID
    );
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getReviewsByProductID, createReview,getReviewsByProductIDAndUserID, updateReview  };
