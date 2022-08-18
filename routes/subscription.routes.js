const express = require('express');

const { 
    addSubscription,
    updateSubscription
} = require('../controllers/subscription.controller');

const router = express.Router();

router.post('/subscription', addSubscription);
router.put('/subscription/:email', updateSubscription);

module.exports = router;