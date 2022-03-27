const express = require('express');

const { stripePayment, stripePaymentSuccessful } = require('./../controllers/stripe.controller');

const router = express.Router();

router.post('/stripe', stripePayment);
router.post('/webhooks', stripePaymentSuccessful);

module.exports = router;