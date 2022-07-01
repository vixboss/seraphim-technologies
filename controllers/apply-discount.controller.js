'use strict';

const ApplyDiscount = require('../models/apply-discount.model');

const getAllByName = async(req, res, next) => {
    try {
        const name = req.body.payload;
        var data = await ApplyDiscount.findByName(name);
        if(data.length > 0) {
            res.status(200).send(data);
        }
        else{
            res.status(202).send("No Record(s) Found.");
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    getAllByName
}

