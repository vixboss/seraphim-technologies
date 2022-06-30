'use strict';

const Discount = require('../models/discount.model');

const addDiscount = async (req, res, next) => {
    try {
        const item = req.body.payload;
        const discount = new Discount(
            item.discountName,
            item.discountType,
            item.discountValue,
            item.discountValidity
        );
        var [data, _] = await Discount.checkDataExisting(item.discountName);
        if(data.length === 0 ){
            await discount.save();
        }
        else{
            return res.status(400).json({message: "Discount exist of same name."});
        }
        res.status(201).json({message: "Discount Added Successfully."});
    } catch (error) {
        res.status(400).send(error);
    }
}

const getAllDiscount = async(req, res, next) => {
    try {
        var data = await Discount.findAll();
        if(data.length > 0){
            res.status(200).send(data);
        }
        else {
            res.status(202).send('No Record(s) Found.');
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const getDiscountById = async(req, res, next) => {
    try {
        var id= req.params.id;
        var data = await Discount.findById(id);
        if(data.length > 0){
            res.status(200).send(data);
        }
        else {
            res.status(202).send('No Record(s) Found.');
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteDiscountById = async(req, res, next) => {
    try {
        var data = await Discount.deleteById(req.params.id);
        res.status(200).send("Deleted Successfully.");
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateDiscountById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        await Discount.update(id, body.payload);
        res.status(200).send("Updated Successfully");
    } catch (error) {
        res.status(400).send(error);
    }
}
module.exports = {
    addDiscount,
    getAllDiscount,
    getDiscountById,
    deleteDiscountById,
    updateDiscountById
}