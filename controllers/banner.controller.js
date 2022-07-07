'use strict';

const Banner = require('../models/banner.model');

const addBanner = async(req, res, next) => {
    try {
        let  title = new Banner(req.body.title);
        title = await title.save();

        res.status(201).json({message: "Title Created"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllBanner = async(req, res, next) => {
    try {
        const [bannerArray, _] = await Banner.findAll();
        res.status(200).json({bannerArray});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBannerById = async(req, res, next) => {
    try {
        let id = req.params.id;
        const [titleById, _] = await Banner.findById(id);
        
        res.status(200).json({data: titleById[0]});
    } catch (error) {
        res.status(400).send(error.message);
        
    }
}

const deleteBannerById = async(req, res, next) => {
    try {
        let id = req.params.id;
        await Banner.remove(id);

        res.status(200).json({message: 'Product Title Removed Successfully.'});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateBanner = async(req, res, next) => {
    try {
        let id = req.params.id;
        let title = req.body.title;
        await Banner.update(id, title);

        res.status(200).json({message: 'Product updated successfully.'});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addBanner,
    getAllBanner,
    getBannerById,
    updateBanner,
    deleteBannerById
}