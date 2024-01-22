import notificationService from '../services/notification.js'

const getNotifications = async(req, res)=>{
    const userID = req.params.userID
    if(!userID) {
        return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
    }
    try {
        const result = await notificationService.getNotifications(userID)
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const addNoti = async(req, res) => {
    const {title, content, userID} = req.body
    if(!title || !content || !userID) {
        return res
      .status(400)
      .json({ code: 0, message: "Vui lòng điền đầy đủ thông tin" });
    }
    try {
        const result = await notificationService.addNoti(title, content, userID)
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export default {getNotifications, addNoti}