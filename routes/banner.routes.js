const express = require('express');

const verifyToken = require('./../authentication/token.authentication');
const { 
    addBanner, 
    getAllBanner, 
    getBannerById, 
    updateBanner, 
    deleteBannerById } = require('../controllers/banner.controller');

const router = express.Router();

router.post('/banner', addBanner);
router.get('/banner', getAllBanner);
router.get('/banner/:id', getBannerById);
router.put('/banner/:id', updateBanner);
router.delete('/banner/:id', deleteBannerById);

module.exports = router;