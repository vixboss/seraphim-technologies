const express = require('express');

const verifyToken = require('./../authentication/token.authentication');
const { 
    addSubscription,
    updateSubscription,
    getSubscription
} = require('../controllers/subscription.controller');

const router = express.Router();

router.post('/subscription', addSubscription);
router.put('/subscription/:email', updateSubscription);
router.get('/subscription',verifyToken, getSubscription);

module.exports = router;