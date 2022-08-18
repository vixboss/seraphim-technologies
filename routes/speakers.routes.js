const express = require('express');

const verifyToken = require('./../authentication/token.authentication');
const { 
    addSpeaker,
    getSpeaker,
    updateSpeaker,
    deleteSpeakerById
} = require('../controllers/speaker.controller');

const router = express.Router();

router.post('/speaker',verifyToken, addSpeaker);
router.get('/speaker', getSpeaker);
router.put('/speaker/:id', verifyToken, updateSpeaker);
router.delete('/speaker/:id', verifyToken, deleteSpeakerById);

module.exports = router;