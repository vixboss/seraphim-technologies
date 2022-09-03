const express = require('express');

const verifyToken = require('./../authentication/token.authentication');
const { 
    addSpeakerOpportunity,
    getAllSpeakerOpportunity
} = require('../controllers/speaker-opportunity.controller');

const router = express.Router();

router.post('/speaker-opportunity', addSpeakerOpportunity);
router.get('/speaker-opportunity', getAllSpeakerOpportunity);
module.exports = router;