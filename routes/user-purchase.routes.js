const express = require('express');
const router = express.Router();

const { getAllPurchasedProduct, getAllCurrentUserPurchase } = require('../controllers/user-purchase.controller');

router.get('/user-purchase', getAllPurchasedProduct);
router.get('/current-user-purchase', getAllCurrentUserPurchase);

module.exports = router;