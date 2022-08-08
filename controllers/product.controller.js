'use strict';
// const firebase = require('../db');
// const firestore = firebase.firestore();
// const fb = require('firebase-admin');

const mongoose = require('mongoose');
const Product = require('../models/product.model');
const ProductType = require('../models/product_type');

// const addProduct = async (req, res, next) => {
//     // try {
//     //     const body = req.body;
//     //     var isProductExist = false;
//     //     const collectionRef = await firestore.collection('collections');
//     //     await collectionRef.get().then(snapshot =>{
//     //         const collectionsMap = snapshot.docs.map(docSnapshot => {
//     //                 const { title, items } = docSnapshot.data();
//     //                 if(title.toLowerCase() === body.title.toLowerCase()){
//     //                     items.map(item => {
//     //                         if(item.name.toLowerCase() === body.items[0].name.toLowerCase()){
//     //                             isProductExist = true;
//     //                         }
//     //                     });
//     //                 }
//     //         });
//     //     });
//     //     if(isProductExist) return res.status(409).send('Product Exist');
//     //     var flag = false;
//     //     await collectionRef.get().then(snapshot =>{
//     //         const collectionsMap = snapshot.docs.map(docSnapshot => {
//     //             const { title, items } = docSnapshot.data();
//     //             const  id  = docSnapshot.id;
//     //             if(title.toLowerCase() === body.title.toLowerCase()){
//     //                 flag = true;
//     //                 collectionRef.doc(id).update({
//     //                     items: fb.firestore.FieldValue.arrayUnion(body.items[0])
//     //                 });
//     //                 return res.status(200).send('product saved');
//     //             }
//     //         });
//     //     });
//     //     if(!flag){
//     //         await collectionRef.doc().set(body);
//     //         return res.status(200).send('product saved');
//     //     }
//     // } catch (error) {
//     //     return res.status(400).send(error.message);
//     // }
// }

// const getProductById = async ( req, res, next ) => {
//     // try {
//     //     const id = req.params.id.toString();
//     //     var product = '';
//     //     const collectionRef = await firestore.collection('collections');
//     //     await collectionRef.get().then(snapshot => {
//     //         snapshot.docs.map(docSnapshot => {
//     //             docSnapshot.data().items.map(item => {
//     //                 if(item.id.toString() === id.toString()){
//     //                     product = item;
//     //                     res.status(200).send(product);
//     //                 }
//     //             });
//     //         });
//     //     });
//     //     if(product === ''){
//     //         res.status(404).send('Product not found by given ID.');
//     //     }
//     // } catch (error) {
//     //     res.status(400).send(error.message);
//     // }
// }

// const updateProduct = async(req, res, next) => {
//     // try {
//     //     const id = req.params.id.toString();
//     //     const body = req.body;
//     //     var flag = false;
//     //     const collectionRef = await firestore.collection('collections');
//     //     await collectionRef.get().then(snapshot => {
//     //         snapshot.docs.map(docSnapshot => {
//     //             const docId = docSnapshot.id;
//     //             docSnapshot.data().items.map(item => {
//     //                 if(item.id.toString() === id.toString()){
//     //                     // Delete
//     //                     collectionRef.doc(docId).update({
//     //                         items: fb.firestore.FieldValue.arrayRemove(item)
//     //                     });
//     //                     // Update
//     //                     collectionRef.get().then(snapshot =>{
//     //                         snapshot.docs.map(docSnapshot => {
//     //                             const { title, items } = docSnapshot.data();
//     //                             const  id  = docSnapshot.id;
//     //                             if(title.toLowerCase() === body.title.toLowerCase()){
//     //                                 flag = true;
//     //                                 collectionRef.doc(id).update({
//     //                                     items: fb.firestore.FieldValue.arrayUnion(body.items[0])
//     //                                 });
//     //                             }
//     //                         });
//     //                     });
//     //                 }
//     //             });
//     //         });
//     //     });
//     //     if(flag){
//     //         await collectionRef.doc().set(body);
//     //     }
//     //     return res.status(200).send('product updated.');
//     // } catch (error) {
//     //     res.status(400).send(error.message);
//     // }
// }

// const deleteProduct = async (req, res, next) => {
//     // try {
//     //     const id = req.params.id.toString();
//     //     const collectionRef = await firestore.collection('collections');
//     //     await collectionRef.get().then(snapshot => {
//     //         snapshot.docs.map(docSnapshot => {
//     //             const docId = docSnapshot.id;
//     //             docSnapshot.data().items.map(item => {
//     //                 if(item.id.toString() === id.toString()){
//     //                     collectionRef.doc(docId).update({
//     //                         items: fb.firestore.FieldValue.arrayRemove(item)
//     //                     });
//     //                     return res.status(200).send("Product Deleted Successfully.");
//     //                 }
//     //             });
//     //         });
//     //     });
//     // } catch (error) {
//     //     res.status(400).send(error.message);
//     // }
// }
// ----------- FROM Remote MySQL ------------------
// const addProduct = async(req, res, next) => {
//     try {
//         const item = req.body.items[0];
//         let product = new Product(
//             item.imageUrl, 
//             item.name,
//             item.merchandise,
//             item.productDescription.description,
//             item.detailFieldTxtArea,
//             item.title,
//             item.heading,
//             item.date,
//             item.duration,
//             item.time,
//             item.speakerName,
//             item.createdAt,
//             item.titleId
//             );
//         var [data, _] = await Product.checkDataExisting(item.title, item.name);
//         if(data.length === 0 ){
//             await product.save();
//         }
//         else{
//             return res.status(400).json({message: "Product exist on same title."});
//         }
//         res.status(201).json({message: "Product Added Successfully."});
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }

// const getAllProduct = async (req, res, next) => {
//     try {
//         var data = await Product.findAll();
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const getProductById = async(req, res, next) => {
//     try {
//         var data = await Product.findById(req.params.id);
//         res.status(201).send(data);
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }

// const updateProduct = async(req, res, next) => {
//     try {
//         var data = await Product.updateById(req.params.id, req.body);
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// }

// const deleteProduct = async(req, res, next) => {
//     try {
//         var data = await Product.deleteProductById(req.params.id);
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// }

// ************************ MongoDB ********************************
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

const addProduct = async(req, res, next) => {
    try {
        const item = req.body.items[0];
        let product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name : item.name,
            imageUrl : item.imageUrl,
            description : item.productDescription.description,
            detailFieldTxtArea : item.detailFieldTxtArea,
            title : item.title.title,
            heading : item.heading,
            date : item.date,
            duration : item.duration,
            time : item.time,
            speakerName : item.speakerName,
            productType_id : item.titleId,
            merchandise:  item.merchandise,
            createdAt : item.createdAt  
        });

        var data = await Product.find({title: item.title.title, name: item.name}).exec();
        if(data.length === 0 ){
            await product.save();
        }
        else{
            return res.status(400).send("Product exist on same title.");
        }
        res.status(201).json({message: "Product Added Successfully."});
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllProduct = async (req, res, next) => {
    try {
        var data = await Product.find();
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

const getProductById = async(req, res, next) => {
    try {
        var data = await Product.findById(req.params.id).exec();
        res.status(201).send([data]);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateProduct = async(req, res, next) => {
    try {
        console.log(req.body);
        const item = req.body.items[0];
        await Product.findByIdAndUpdate({
            _id: req.params.id
        },{
            name : item.name,
            imageUrl : item.imageUrl,
            description : item.productDescription.description,
            detailFieldTxtArea : item.detailFieldTxtArea,
            title : item.title.title,
            heading : item.heading,
            date : item.date,
            duration : item.duration,
            time : item.time,
            speakerName : item.speakerName,
            productType_id : item.titleId,
            merchandise:  item.merchandise,
            createdAt : item.createdAt 
        });
        res.status(200).json({message: 'Product updated successfully.'});
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteProduct = async(req, res, next) => {
    try {
        var data = await Product.remove({_id: req.params.id});
        res.status(200).json({message: 'Product deleted successfully.'});
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = {
    addProduct,
    deleteProduct,
    getProductById,
    updateProduct,
    getAllProduct
}