'use strict';
// const firebase = require('../db');
// const firestore = firebase.firestore();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

const Admin = require('../models/admin.model');

const generateHash = (password) => {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const compareHash = (password, hashed) => {
    return bcrypt.compareSync(password, hashed);
}

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
        
        // Decode password to string (UTF-8).
        var base64 = req.body.password;
        var words = CryptoJS.enc.Base64.parse(base64);
        var password = CryptoJS.enc.Utf8.stringify(words); 
        /*********************************/
        
        const email = req.body.email;
        const hashPassword = generateHash(req.body.password);

        let [data, _] = await Admin.findAll();
        if(data.length === 0){
            await Admin.addAdmin(email, hashPassword);
        }
        else {
            const adminData = await Admin.getAdminData(email);
            if(adminData.length === 1){
                const comparedPassword = compareHash(password, adminData[0].password);
                if(comparedPassword){
                    jwt.sign({admin: data[0]}, 'secretkey', (err, token) => {
                        res.status(200).json({token});
                    });
                }
                else{
                    res.status(400).send({message: "Password doesn't match"});
                }
            }
            else {
                res.status(400).send({message: "Email or Password Incorrect."});
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAdmin
};