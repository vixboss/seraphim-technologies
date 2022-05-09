const express = require('express');

const { stripePayment, stripePaymentSuccessful, checkoutCompletedSuccessful } = require('./../controllers/stripe.controller');

const router = express.Router();

router.post('/stripe', stripePayment);
router.post('/webhooks', stripePaymentSuccessful);
router.post('/checkout_session_completed', checkoutCompletedSuccessful);

module.exports = router;