'use strict';
// const firebase = require('../db');
// const firestore = firebase.firestore();

// const mysql = require('../db');

const mongoose = require('mongoose');
const ProductType = require('../models/product_type');

// const addProductType = async (req, res, next) => {
//     try {
//         const typeData = req.body;

//         const productType = await firestore.collection('product_type');
//         const checkProductType = await productType.where('title', '==', req.body.title.toLowerCase()).get();
//         const typeArray = [];
//         checkProductType.forEach(doc => {
//             const type = new ProductType(
//                 doc.id,
//                 doc.data().title
//             );
//             typeArray.push(type);
//         });
//         if(typeArray.length !== 0){
//             res.status(409).send('Product Title exist');
//         }
//         else{
//             productType.doc().set(typeData);
//             res.status(201).send({
//                 message: "Product Type saved successfully."
//             });
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const getAllProductType = async(req, res, next) => {
//     try { 
//         const productTypes = await firestore.collection('product_type');
//         const data = await productTypes.get();
//         const productTypeArray = [];

//         if(data.empty){
//             res.status(202).send({
//                 productTypeArray,
//                 'message': 'No Product Types found.'
//             });
//         }else{
//             data.forEach(doc => {
//                 const productType = new ProductType(
//                     doc.id,
//                     doc.data().title
//                 );
//                 productTypeArray.push(productType);
//             });
//             res.status(200).send({
//                 productTypeArray
//             });
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const getProductTypeById = async(req, res, next) => {
//     try {
//         const id = req.params.id;
//         const productType = await firestore.collection('product_type').doc(id);
//         const data = await productType.get();
//         if(!data.exists){
//             res.status(404).send('Product with the given ID not found.');
//         }else{
//             res.status(200).send(data.data());
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const updateProductType = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const body = req.body;

//         const productType = await firestore.collection('product_type');
//         const checkProductType = await productType.where('title', '==', req.body.title.toLowerCase()).get();
//         const typeArray = [];
//         checkProductType.forEach(doc => {
//             const type = new ProductType(
//                 doc.id,
//                 doc.data().title
//             );
//             typeArray.push(type);
//         });
//         if(typeArray.length !== 0){
//             res.status(409).send('Product Title exist');
//         }
//         else{
//             const productType = await firestore.collection('product_type').doc(id).update(body);
//             res.status(200).send('Product type updated successfully');
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const deleteProductTypeById = async(req, res, next) => {
//     try {
//         var isProductExistOfTitle = false;
//         const id = req.params.id;
//         const titleRef = await firestore.collection('product_type').doc(id).get();
//         const title = titleRef.data().title;
//         const collectionRef = await firestore.collection('collections');
//         await collectionRef.get().then(snapshot => {
//             snapshot.docs.map(docSnapshot => {
//                 if(title.toLowerCase() === docSnapshot.data().title.toLowerCase()) {
//                     isProductExistOfTitle = true;
//                 }
//             })
//         });
//         if(!isProductExistOfTitle){
//             await firestore.collection('product_type').doc(id).delete();
//             res.status(200).send('Product type deleted successfully');
//         }
//         else{
//             res.status(400).send('Product Exist For Same Type.');
//         }
//     } catch (error) {
//         res.status(400).send(error.message);  
//     }
// }

// ******************* Mysql Query ***************************
// const addProductType = async(req, res, next) => {
//     try {
//         let  title = new ProductType(req.body.title);
//         var [data, _] = await ProductType.checkDataExisting(req.body.title);
//         console.log(data)
//         if(data.length === 0 ){
//             await title.save();  
//         }
//         else{
//             return res.status(400).json({message: "Product Type exist."});
//         }
//         res.status(201).json({message: "Title Created"});
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const getAllProductType = async(req, res, next) => {
//     try {
//         const [productTypeArray, _] = await ProductType.findAll();
//         res.status(200).json({productTypeArray});
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const getProductTypeById = async(req, res, next) => {
//     try {
//         let id = req.params.id;
//         const [titleById, _] = await ProductType.findById(id);
        
//         res.status(200).json({data: titleById[0]});
//     } catch (error) {
//         res.status(400).send(error.message);
        
//     }
// }

// const deleteProductTypeById = async(req, res, next) => {
//     try {
//         let id = req.params.id;
//         await ProductType.remove(id);

//         res.status(200).json({message: 'Product Title Removed Successfully.'});
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const updateProductType = async(req, res, next) => {
//     try {
//         let id = req.params.id;
//         let title = req.body.title;
//         await ProductType.update(id, title);

//         res.status(200).json({message: 'Product updated successfully.'});
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// ********************************************************************

// *************************MongoDB Query **************************

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

const addProductType = async(req, res, next) => {
    try {
        let title = new ProductType({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            createdAt: currentDate()
        });
        var data = await ProductType.find({title: req.body.title});
        console.log(data)
        if(data.length === 0 ){
            await title.save();  
        }
        else{
            return res.status(400).json({message: "Product Type exist."});
        }
        res.status(201).json({message: "Title Created"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllProductType = async(req, res, next) => {
    try {
        const productTypeArray = await ProductType.find();
        res.status(200).json({productTypeArray});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProductTypeById = async(req, res, next) => {
    try {
        let id = req.params.id;
        const titleById = await ProductType.findById(id);
        
        res.status(200).json({data: titleById[0]});
    } catch (error) {
        res.status(400).send(error.message);
        
    }
}

const updateProductType = async(req, res, next) => {
    try {
        console.log(req.params);
        let id = req.params.id;
        let title = req.body.title;
        await ProductType.findByIdAndUpdate({
            _id: id
        },{
            title: req.body.title,
            createdAt: currentDate()
        });

        res.status(200).json({message: 'Product updated successfully.'});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteProductTypeById = async(req, res, next) => {
    try {
        let id = req.params.id;
        await ProductType.remove({_id: id});

        res.status(200).json({message: 'Product Title Removed Successfully.'});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// *****************************************************************
module.exports = {
    addProductType,
    getAllProductType,
    getProductTypeById,
    updateProductType,
    deleteProductTypeById
}