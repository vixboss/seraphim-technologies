const express = require('express');

const verifyToken = require('./../authentication/token.authentication');
const { 
    addSpeaker
} = require('../controllers/speaker.controller');

const router = express.Router();

router.post('/speaker', addSpeaker);
// router.get('/product-types', verifyToken, getAllProductType);
// router.get('/product-type/:id', verifyToken, getProductTypeById);
// router.put('/product-type/:id', verifyToken, updateProductType);
// router.delete('/product-type/:id', verifyToken, deleteProductTypeById);

module.exports = router;