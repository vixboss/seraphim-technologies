'use strict';
const { response } = require('express');
const firebase = require('../db');
const firestore = firebase.firestore();
// const fb = require('firebase-admin');
const moment = require('moment-timezone');

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

const dateConverter = (UNIX_timestamp) => {
    const milliseconds = new Date(UNIX_timestamp * 1000);
    const dateObject = new Date(milliseconds);

    var year = dateObject.toLocaleString('en-us', {year: 'numeric'});
    var month = dateObject.toLocaleString('en-us', {month: '2-digit'});
    var day = dateObject.toLocaleString('en-us', {day: '2-digit'});
    
    return day +'-'+ month +'-'+ year;
}

const timeConverter = (UNIX_timestamp) => {
    const date = new Date(UNIX_timestamp * 1000);
    var myTimezone = "America/New_York";
    var myDatetimeFormat= "hh:mm:ss a z";
    var myDatetimeString = moment(date).tz(myTimezone).format(myDatetimeFormat);
    return (myDatetimeString);
}
const getAllCurrentUserPurchase = async (req, res, next) => {
    try {
        let currentUserPurchaseArray = [];
        const collectionRef = await firestore.collection('user_purchased');
        await collectionRef.get().then(snapshot => {
            snapshot.docs.map(docSnapshot => {
                var email = docSnapshot.data().email;
                docSnapshot.data().items.map(doc => {
                    let date;
                    let time;
                    let status;
                    for (var key in doc) {
                        
                        if (doc.hasOwnProperty(key)) {
                            var val = doc[key];
                            date = dateConverter(doc['date']._seconds);
                            time = timeConverter(doc['date']._seconds);
                            status = doc['status'];
                            if(key !== 'date' && key !== 'status'){
                                currentUserPurchaseArray.push({
                                    email: email,
                                    date: date,
                                    time: time,
                                    userPurchase: {
                                        id: val.id,
                                        amount_total: val.amount_total,
                                        quantity: val.quantity,
                                        description: val.description,
                                        currency: val.currency,
                                    },
                                    status: status
                                });
                            }
                        }
                    }
                });
            });
            var newCurrentUserPurchaseArray = [];
            currentUserPurchaseArray.map((currentUsrPurchase, index) => {
                newCurrentUserPurchaseArray.push({
                    ...currentUsrPurchase,
                    s_no: index + 1
                });
            });
            res.status(200).send(newCurrentUserPurchaseArray);
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllPurchasedProduct,
    getAllCurrentUserPurchase
}