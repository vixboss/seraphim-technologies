'use strict';

const ProductSearch = require('./../models/product-search.model');

const searchProductByName = async(req, res, next) => {
    try {
        console.log(req.body);
        const name = req.body.payload;
        var data = await ProductSearch.searchAll(name);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    searchProductByName
}