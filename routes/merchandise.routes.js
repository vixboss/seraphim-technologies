const express = require('express');
const router = express.Router();

const verifyToken = require('./../authentication/token.authentication');
const { 
        addMerchandiseTitle, 
        getAllMerchandise,
        updateMerchandise,
        deleteMerchandiseById
    } = require('../controllers/merchandise.controller');

router.post('/merchandise',verifyToken, addMerchandiseTitle);
router.get('/merchandise',verifyToken, getAllMerchandise);
router.put('/merchandise/:id',verifyToken, updateMerchandise);
router.delete('/merchandise/:id',verifyToken, deleteMerchandiseById);


module.exports = router;
