'use strict';
// const firebase = require('../db');
// const firestore = firebase.firestore();
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin.model');

// const getAdmin = async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;

//         const admin = await firestore.collection('admin');
//         const data = await admin.where('email', '==', email).where('password', '==', password).get();
//         const adminArray = [];
//         if(data.empty){
//             res.status(404).send('Admin not Found...');
//         }
//         else{
//             data.forEach(doc => {
//                 const adminData = new Admin(
//                     doc.id,
//                     doc.data().email,
//                     doc.data().password
//                 );
//                 adminArray.push(adminData);
//             });
//             jwt.sign({admin: adminArray}, 'secretkey', (err, token) => {
//                 res.status(200).json({token});
//             });
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

const getAdmin = async(req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        let [data, _] = await Admin.findAll(email, password);
        if(data.length === 0){
            return res.status(404).send('Admin not Found...');
        }
        jwt.sign({admin: data[0]}, 'secretkey', (err, token) => {
            res.status(200).json({token});
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAdmin
};