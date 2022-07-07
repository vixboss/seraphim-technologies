const express = require('express');

const { getProductByName } = require('./../controllers/product-by-name.controller');

const router = express.Router();

router.post('/product-by-name', getProductByName);

module.exports = router;