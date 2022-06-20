const express = require('express');

const verifyToken = require('./../authentication/token.authentication');
const { addProduct, deleteProduct, getProductById, updateProduct, getAllProduct } = require('./../controllers/product.controller');

const router = express.Router();

router.post('/product', verifyToken, addProduct);
router.delete('/product/:id',verifyToken, deleteProduct);
router.get('/product/:id',verifyToken, getProductById);
router.put('/product/:id',verifyToken, updateProduct);
router.get('/product',verifyToken, getAllProduct);

module.exports = router;