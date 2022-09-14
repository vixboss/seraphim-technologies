const express = require('express');

const verifyToken = require('./../authentication/token.authentication');
const { 
    addSuggestTopic,
    getSuggestTopic
} = require('../controllers/suggest-topic.controller');

const router = express.Router();

router.post('/suggest-topic', addSuggestTopic);
router.get('/suggest-topic',verifyToken, getSuggestTopic);

module.exports = router;