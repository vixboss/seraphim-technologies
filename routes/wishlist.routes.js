const express = require('express');
const router = express.Router();

const { 
    addWishlist,
    getWishlist,
    removeWishlist
} = require('../controllers/wishlist.controller');

router.post('/wishlist', addWishlist);
router.get('/wishlist/:email', getWishlist);
router.delete('/wishlist/:id', removeWishlist)

module.exports = router;