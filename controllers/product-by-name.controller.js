'use strict';

// const ProductByName = require('../models/product-by-name.model');
const Product = require('../models/product.model');

const getProductByName = async(req, res, next) => {
    try {

        // var data = await ProductByName.findByName(req.body.name.trim());
        var data = await Product.find({name: req.body.name.trim()});
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getProductByName
}