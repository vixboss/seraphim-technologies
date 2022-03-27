'use strict';
const firebase = require('../db');
const firestore = firebase.firestore();
const fb = require('firebase-admin');

const Product = require('../models/product.model');

const addProduct = async (req, res, next) => {
    try {
        const body = req.body;
        var isProductExist = false;
        const collectionRef = await firestore.collection('collections');
        await collectionRef.get().then(snapshot =>{
            const collectionsMap = snapshot.docs.map(docSnapshot => {
                    const { title, items } = docSnapshot.data();
                    if(title.toLowerCase() === body.title.toLowerCase()){
                        items.map(item => {
                            if(item.name.toLowerCase() === body.items[0].name.toLowerCase()){
                                isProductExist = true;
                            }
                        });
                    }
            });
        });
        if(isProductExist) return res.status(409).send('Product Exist');
        var flag = false;
        await collectionRef.get().then(snapshot =>{
            const collectionsMap = snapshot.docs.map(docSnapshot => {
                const { title, items } = docSnapshot.data();
                const  id  = docSnapshot.id;
                if(title.toLowerCase() === body.title.toLowerCase()){
                    flag = true;
                    collectionRef.doc(id).update({
                        items: fb.firestore.FieldValue.arrayUnion(body.items[0])
                    });
                    return res.status(200).send('product saved');
                }
            });
        });
        if(!flag){
            await collectionRef.doc().set(body);
            return res.status(200).send('product saved');
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getProductById = async ( req, res, next ) => {
    try {
        const id = req.params.id.toString();
        var product = '';
        const collectionRef = await firestore.collection('collections');
        await collectionRef.get().then(snapshot => {
            snapshot.docs.map(docSnapshot => {
                docSnapshot.data().items.map(item => {
                    if(item.id.toString() === id.toString()){
                        product = item;
                        res.status(200).send(product);
                    }
                });
            });
        });
        if(product === ''){
            res.status(404).send('Product not found by given ID.');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProduct = async(req, res, next) => {
    try {
        const id = req.params.id.toString();
        const body = req.body;
        var flag = false;
        const collectionRef = await firestore.collection('collections');
        await collectionRef.get().then(snapshot => {
            snapshot.docs.map(docSnapshot => {
                const docId = docSnapshot.id;
                docSnapshot.data().items.map(item => {
                    if(item.id.toString() === id.toString()){
                        // Delete
                        collectionRef.doc(docId).update({
                            items: fb.firestore.FieldValue.arrayRemove(item)
                        });
                        // Update
                        collectionRef.get().then(snapshot =>{
                            snapshot.docs.map(docSnapshot => {
                                const { title, items } = docSnapshot.data();
                                const  id  = docSnapshot.id;
                                if(title.toLowerCase() === body.title.toLowerCase()){
                                    flag = true;
                                    collectionRef.doc(id).update({
                                        items: fb.firestore.FieldValue.arrayUnion(body.items[0])
                                    });
                                }
                            });
                        });
                    }
                });
            });
        });
        if(flag){
            await collectionRef.doc().set(body);
        }
        return res.status(200).send('product updated.');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id.toString();
        const collectionRef = await firestore.collection('collections');
        await collectionRef.get().then(snapshot => {
            snapshot.docs.map(docSnapshot => {
                const docId = docSnapshot.id;
                docSnapshot.data().items.map(item => {
                    if(item.id.toString() === id.toString()){
                        collectionRef.doc(docId).update({
                            items: fb.firestore.FieldValue.arrayRemove(item)
                        });
                        return res.status(200).send("Product Deleted Successfully.");
                    }
                });
            });
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}
// ----------- FROM Remote MySQL ------------------
// const addProduct = async(req, res, next) => {
//     try {
//         console.log(req.body.items[0].productDescription);
//         const item = req.body.items[0];
//         let product = new Product(
//             item.imageUrl, 
//             item.name,
//             item.price,
//             item.productDescription,
//             item.description,
//             item.detailFields,
//             item.title,
//             item.heading,
//             item.status,
//             item.date,
//             item.duration,
//             item.time,
//             item.speakerName,
//             item.createdAt
//             );
//         var [data, _] = await product.checkDataExisting();
//         if(data.length === 0 ){
//             var [savedProduct, _] = await product.save();
//             console.log(savedProduct);
//         }
//         else{
//             return res.status(400).json({message: "Product exist on same title."});
//         }
//         res.status(201).json({message: "Product Added Successfully."});
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// }
module.exports = {
    addProduct,
    deleteProduct,
    getProductById,
    updateProduct
}