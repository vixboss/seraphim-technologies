const express = require('express');
const router = express.Router();

const { searchProductByName } = require('../controllers/product-search.controller');

router.post('/search-product', searchProductByName);

module.exports = router;