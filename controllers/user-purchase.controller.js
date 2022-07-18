'use strict';
// const { response } = require('express');
// const firebase = require('../db');
// const firestore = firebase.firestore();
// const fb = require('firebase-admin');
// const moment = require('moment-timezone');
const UserPurchase = require('../models/user-purchase.model');

// const getAllPurchasedProduct = async ( req, res, next ) => {
    // try {
    //     var purchasedArray = [];
    //     const collectionRef = await firestore.collection('user_purchased');
    //     await collectionRef.get().then(snapshot => {
    //         snapshot.docs.map(docSnapshot => {
    //             purchasedArray.push(docSnapshot.data());
    //         });
    //     });

    //     res.status(200).send(purchasedArray);
    // } catch (error) {
    //     res.status(400).send(error.message);
    // }
// }

// const dateConverter = (UNIX_timestamp) => {
//     const milliseconds = new Date(UNIX_timestamp * 1000);
//     const dateObject = new Date(milliseconds);

//     var year = dateObject.toLocaleString('en-us', {year: 'numeric'});
//     var month = dateObject.toLocaleString('en-us', {month: '2-digit'});
//     var day = dateObject.toLocaleString('en-us', {day: '2-digit'});
    
//     return day +'-'+ month +'-'+ year;
// }

// const timeConverter = (UNIX_timestamp) => {
//     const date = new Date(UNIX_timestamp * 1000);
//     var myTimezone = "America/New_York";
//     var myDatetimeFormat= "hh:mm:ss a z";
//     var myDatetimeString = moment(date).tz(myTimezone).format(myDatetimeFormat);
//     return (myDatetimeString);
// }
// const getAllCurrentUserPurchase = async (req, res, next) => {
    // try {
    //     let currentUserPurchaseArray = [];
    //     const collectionRef = await firestore.collection('user_purchased');
    //     await collectionRef.get().then(snapshot => {
    //         snapshot.docs.map(docSnapshot => {
    //             var email = docSnapshot.data().email;
    //             docSnapshot.data().items.map(doc => {
    //                 let date;
    //                 let time;
    //                 let status;
    //                 for (var key in doc) {
                        
    //                     if (doc.hasOwnProperty(key)) {
    //                         var val = doc[key];
    //                         date = dateConverter(doc['date']._seconds);
    //                         time = timeConverter(doc['date']._seconds);

    //                         status = doc['status'];
    //                         if(key !== 'date' && key !== 'status'){
    //                             currentUserPurchaseArray.push({
    //                                 email: email,
    //                                 date: date,
    //                                 time: time,
    //                                 id: val.id,
    //                                 amount_total: val.amount_total,
    //                                 quantity: val.quantity,
    //                                 description: val.description,
    //                                 currency: val.currency,
    //                                 status: status
    //                             });
    //                         }
    //                     }
    //                 }
    //             });
    //         });
    //         const sortedCurrentUserPurchaseArray = currentUserPurchaseArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    //         var newCurrentUserPurchaseArray = [];
    //         sortedCurrentUserPurchaseArray.map((currentUsrPurchase, index) => {
    //             newCurrentUserPurchaseArray.push({
    //                 ...currentUsrPurchase,
    //                 s_no: index + 1
    //             });
    //         });
            
    //         res.status(200).send(newCurrentUserPurchaseArray);
    //     })
    // } catch (error) {
    //     res.status(400).send(error.message);
    // }
// }


const insertUserPurchase = async(req, res, next) => {
    try {
        const body = req.body;
        const name = body.payer.name.given_name +' '+ body.payer.name.surname;
        const deliveryStatus = 0;
        let userPurchase = new UserPurchase(
            name,
            body.payer.email_address,
            body.payer.phone.phone_number.national_number,
            body.id,
            body.purchase_units[0].amount.breakdown.item_total.value,
            body.purchase_units[0].amount.value,
            body.purchase_units[0].items,
            deliveryStatus,
            body.merchant
        );

        await userPurchase.save();
        res.status(201).json({message: "User Purchase Added Successfully."});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUserPurchase = async (req, res, next) => {
    try {
        const data = await UserPurchase.getAllUserPurchase();
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateDelivery = async(req, res, next) => {
    try {
        await UserPurchase.updateDeliveryStatus(req.body);
        res.status(200).send("Delivery Status Updated.");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    // getAllPurchasedProduct,
    // getAllCurrentUserPurchase
    insertUserPurchase,
    getUserPurchase,
    updateDelivery
}