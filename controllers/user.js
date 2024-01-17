import userService from "../services/user.js";

const getUserByID = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const { userID, email, fullname, sex, birthday, phone_number } = req.body;
  if (!userID || !email || !fullname || !sex || !birthday || !phone_number) {
    return res.json({ code: 0, message: "Vui lòng điền đầy đủ thôn tin" });
  }
  try {
    const result = await userService.updateUser(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const changePass = async (req, res) => {
  const { userID, oldPass, newPass } = req.body;
  if (!userID || !oldPass || !newPass) {
    return res.json({ code: 0, message: "Vui lòng điền đầy đủ thôn tin" });
  }
  try {
    const result = await userService.changePass(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { getUserByID, updateUser, changePass };
