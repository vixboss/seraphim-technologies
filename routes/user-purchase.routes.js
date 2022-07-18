const express = require('express');
const router = express.Router();

const verifyToken = require('./../authentication/token.authentication');
const { insertUserPurchase, getUserPurchase, updateDelivery } = require('../controllers/user-purchase.controller');

// router.get('/user-purchase', verifyToken, getAllPurchasedProduct);
// router.get('/current-user-purchase', verifyToken, getAllCurrentUserPurchase);

router.post('/user-purchase',verifyToken, insertUserPurchase);
router.get('/user-purchase',verifyToken, getUserPurchase);
router.put('/user-purchase-delivery-status/:id',verifyToken, updateDelivery);

module.exports = router;