'use strict';
const firebase = require('../db');
const firestore = firebase.firestore();
// const fb = require('firebase-admin');

const getAllPurchasedProduct = async ( req, res, next ) => {
    try {
        var purchasedArray = [];
        const collectionRef = await firestore.collection('user_purchased');
        await collectionRef.get().then(snapshot => {
            snapshot.docs.map(docSnapshot => {
                purchasedArray.push(docSnapshot.data());
            });
        });

        res.status(200).send(purchasedArray);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllPurchasedProduct
}