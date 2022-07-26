const express = require('express');
const { paypalNotificationMail } = require('../controllers/paypalPaymentNotificationMail.controller');

const router = express.Router();

router.post('/paypal-notification-mail', paypalNotificationMail);

module.exports = router;