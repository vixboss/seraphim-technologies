const express = require('express');

const verifyToken = require('./../authentication/token.authentication');
const { 
    addBanner, 
    getAllBanner, 
    getBannerById, 
    updateBanner, 
    deleteBannerById } = require('../controllers/banner.controller');

const router = express.Router();

router.post('/banner', verifyToken, addBanner);
router.get('/banner', getAllBanner);
router.get('/banner/:id', verifyToken, getBannerById);
router.put('/banner/:id', verifyToken, updateBanner);
router.delete('/banner/:id',verifyToken, deleteBannerById);

module.exports = router;