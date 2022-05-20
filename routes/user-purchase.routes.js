const express = require('express');
const router = express.Router();

const { getAllPurchasedProduct } = require('../controllers/user-purchase.controller');

router.get('/user-purchase', getAllPurchasedProduct);

module.exports = router;