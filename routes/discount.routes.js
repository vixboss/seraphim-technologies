const express = require('express');
const router = express.Router();

const verifyToken = require('./../authentication/token.authentication');
const { 
    addDiscount,
    getAllDiscount,
    getDiscountById,
    deleteDiscountById,
    updateDiscountById
    } = require('../controllers/discount.controller');

router.post('/discount',verifyToken, addDiscount);
router.get('/discount',verifyToken, getAllDiscount);
router.get('/discount/:id',verifyToken, getDiscountById);
router.delete('/discount/:id',verifyToken, deleteDiscountById);
router.put('/discount/:id',verifyToken.apply, updateDiscountById);
module.exports = router;
