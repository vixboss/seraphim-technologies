'use strict';

// const ProductSearch = require('./../models/product-search.model');
const Product = require('../models/product.model');
const ProductType = require('../models/product_type');

const searchProductByName = async(req, res, next) => {
    try {
        const name = req.body.payload;
        // var data = await ProductSearch.searchAll(name);
        var data = await Product.find({
            name: { 
                $regex: name,
                $options: "i" 
            }
        });
        let newArray = [];
        let newItemsObj;

        var titleId = await ProductType.find().exec();
        for(var i = 0; i < titleId.length; i++ ){
            newItemsObj = {
                items: data.filter(obj => obj.title == titleId[i].title).map(obj => obj),
                title: [...new Set(data.filter(obj => obj.title == titleId[i].title).map(obj => obj.title))].toString(),
                id: titleId[i]._id.toString()
            };

            if(newItemsObj.title !== ""){
                newArray.push(newItemsObj);
            }
        }
        res.status(200).send(newArray);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    searchProductByName
}