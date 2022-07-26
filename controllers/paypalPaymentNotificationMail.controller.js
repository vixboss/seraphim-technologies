const {notificationMail} = require('../factory');

const paypalNotificationMail = async(req, res, next) => {
    notificationMail(process.env.NOTIFICATION_EMAIL, req.body);
    res.status(200).send("Mail Sent");
}

module.exports = {
    paypalNotificationMail
}