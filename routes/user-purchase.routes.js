const express = require('express');
const router = express.Router();

const verifyToken = require('./../authentication/token.authentication');
const { getAllPurchasedProduct, getAllCurrentUserPurchase } = require('../controllers/user-purchase.controller');

router.get('/user-purchase', verifyToken, getAllPurchasedProduct);
router.get('/current-user-purchase', verifyToken, getAllCurrentUserPurchase);

module.exports = router;