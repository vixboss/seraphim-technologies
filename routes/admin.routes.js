const express = require('express');
const { getAdmin } = require('./../controllers/admin.controller');

const router = express.Router();

router.post('/admin', getAdmin);

module.exports = router;