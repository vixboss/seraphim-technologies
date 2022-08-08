const express = require('express');

const verifyToken = require('./../authentication/token.authentication');
const { addProductType, getAllProductType, getProductTypeById, updateProductType, deleteProductTypeById } = require('../controllers/productTypeController');

const router = express.Router();

router.post('/product-type', verifyToken, addProductType);
router.get('/product-types', verifyToken, getAllProductType);
router.get('/product-type/:id', verifyToken, getProductTypeById);
router.put('/product-type/:id', verifyToken, updateProductType);
router.delete('/product-type/:id', verifyToken, deleteProductTypeById);

module.exports = router;