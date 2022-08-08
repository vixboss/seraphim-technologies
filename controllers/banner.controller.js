'use strict';
const mongoose = require('mongoose');
const Banner = require('../models/banner.model');

// const addBanner = async(req, res, next) => {
//     try {
//         let  title = new Banner(req.body.title);
//         title = await title.save();

//         res.status(201).json({message: "Title Created"});
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const getAllBanner = async(req, res, next) => {
//     try {
//         const [bannerArray, _] = await Banner.findAll();
//         res.status(200).json({bannerArray});
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const getBannerById = async(req, res, next) => {
//     try {
//         let id = req.params.id;
//         const [titleById, _] = await Banner.findById(id);
        
//         res.status(200).json({data: titleById[0]});
//     } catch (error) {
//         res.status(400).send(error.message);
        
//     }
// }

// const deleteBannerById = async(req, res, next) => {
//     try {
//         let id = req.params.id;
//         await Banner.remove(id);

//         res.status(200).json({message: 'Product Title Removed Successfully.'});
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const updateBanner = async(req, res, next) => {
//     try {
//         let id = req.params.id;
//         let title = req.body.title;
//         await Banner.update(id, title);

//         res.status(200).json({message: 'Product updated successfully.'});
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// **************************** MongoDB ****************************
const currentDate = () => {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let hh = d.getHours();
    let min = d.getMinutes();
    let ss = d.getSeconds();

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

const addBanner = async(req, res, next) => {
    try {
        let  title = new Banner({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            createdAt: currentDate()
        });
        await title.save();

        res.status(201).json({message: "Title Created"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllBanner = async(req, res, next) => {
    try {
        const bannerArray = await Banner.find();
        res.status(200).json({bannerArray});
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getBannerById = async(req, res, next) => {
    try {
        let id = req.params.id;
        const titleById = await Banner.findById(id);
        
        res.status(200).json({data: titleById[0]});
    } catch (error) {
        res.status(400).send(error.message);
        
    }
}

const deleteBannerById = async(req, res, next) => {
    try {
        let id = req.params.id;
        await Banner.remove({_id: id});

        res.status(200).json({message: 'Product Title Removed Successfully.'});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateBanner = async(req, res, next) => {
    try {
        let id = req.params.id;
        let title = req.body.title;
        await Banner.findByIdAndUpdate({
            _id: id
        },{
            title: title,
            createdAt: currentDate()
        });

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