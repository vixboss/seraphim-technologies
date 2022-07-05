const express = require('express');
const router = express.Router();

const { getAllByName } = require('../controllers/apply-discount.controller');

router.post('/apply-discount', getAllByName);

module.exports = router;