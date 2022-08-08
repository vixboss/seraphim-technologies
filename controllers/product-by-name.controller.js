'use strict';

// const ProductByName = require('../models/product-by-name.model');
const Product = require('../models/product.model');
const ProductType = require('../models/product_type');

const getProductByName = async(req, res, next) => {
    try {
        // var data = await ProductByName.findByName(req.body.name.trim());
        // console.log(req.body.name.trim());
        var name = req.body.name.trim();
        console.log(name);
        var data = await Product.find({
            name: { 
                $regex: name,
                $options: "i" 
            }
        });
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getProductByName
}