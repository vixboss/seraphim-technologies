'use strict';
// const { response } = require('express');
// const firebase = require('../db');
// const firestore = firebase.firestore();
// const fb = require('firebase-admin');
// const moment = require('moment-timezone');
const mongoose = require('mongoose');
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

// *************************** Mysql DB *****************************************
// const insertUserPurchase = async(req, res, next) => {
//     try {
//         const body = req.body;
//         const name = body.payer.name.given_name +' '+ body.payer.name.surname;
//         const deliveryStatus = 0;
//         let userPurchase = new UserPurchase(
//             name,
//             body.payer.email_address,
//             body.payer.phone.phone_number.national_number,
//             body.id,
//             body.purchase_units[0].amount.breakdown.item_total.value,
//             body.purchase_units[0].amount.value,
//             body.purchase_units[0].items,
//             deliveryStatus,
//             body.merchant
//         );

//         await userPurchase.save();
//         res.status(201).json({message: "User Purchase Added Successfully."});
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const getUserPurchase = async (req, res, next) => {
//     try {
//         const data = await UserPurchase.getAllUserPurchase();
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const updateDelivery = async(req, res, next) => {
//     try {
//         await UserPurchase.updateDeliveryStatus(req.body);
//         res.status(200).send("Delivery Status Updated.");
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const searchPurchase = async (req, res, next) => {
//     try {
//         const data = await UserPurchase.searchUserPurchase(req.body);
//         if(data.message){
//             res.status(400).send(data.message);
//         }
//         else{
//             res.status(200).send(data);
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// **************************** MongoDB ***************************
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

const insertUserPurchase = async(req, res, next) => {
    try {
        const body = req.body;
        const name = body.payer.name.given_name +' '+ body.payer.name.surname;
        
        var newItems = [];
        body.purchase_units[0].items.map((item) => {
            var obj = {
                description: item.name,
                unit_amount: item.unit_amount.value,
                quantity: item.quantity,
                createdAt: body.create_time,
                deliveryStatus: false
            }
            newItems.push(obj);
        });
        let userPurchase = new UserPurchase({
            _id: new mongoose.Types.ObjectId(),
            name : name,
            email : body.payer.email_address,
            order_id : body.id,
            gross_amount : body.purchase_units[0].amount.breakdown.item_total.value,
            total_amount : body.purchase_units[0].amount.value,
            merchant : body.merchant,
            items: newItems,
            createdAt : currentDate()
        });
        await userPurchase.save();
        res.status(201).json({message: "User Purchase Added Successfully."});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUserPurchase = async (req, res, next) => {
    try {
        const data = await UserPurchase.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateDelivery = async(req, res, next) => {
    try {
        const doc =  await UserPurchase.findOneAndUpdate(
            {
                'items': {$elemMatch: {_id: req.body.id}}
            }, 
            {
                $set: { "items.$.deliveryStatus": req.body.status }
            },
            { 
                new: true
            }
        );
        res.status(200).send("Delivery Status Updated.");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const searchPurchase = async (req, res, next) => {
    try {
        const searchData = req.body;

        const id = searchData.orderId;
        const description = searchData.productName;
        const email = searchData.email;
        const payerName = searchData.payerName;
        const newFromDate = searchData.fromDate;
        const newToDate = searchData.toDate;

        console.log(req.body);
        const data = await UserPurchase.find({
            $and:[
                {
                    name: { 
                        $regex: payerName,
                        $options: "i" 
                    }
                },
                {
                    email: {
                        $regex: email,
                        $options: "i" 
                    }
                },
                {
                    order_id: {
                        $regex: id,
                        $options: "i" 
                    }
                },
                {
                    items: {
                        $elemMatch: {
                            description: {
                                $regex: description,
                                $options: "i" 
                            }
                        }
                    }
                },
                {
                    createdAt:{
                        $gte: new Date(newFromDate),
                        $lte: new Date(newToDate)
                    }
                }
            ]
        });

        if(data.message){
            res.status(400).send(data.message);
        }
        else{
            res.status(200).send(data);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    // getAllPurchasedProduct,
    // getAllCurrentUserPurchase
    insertUserPurchase,
    getUserPurchase,
    updateDelivery,
    searchPurchase
}