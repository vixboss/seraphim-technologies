// MySql Databse Model.
// const db = require("../db");

// class Admin {
//     static findAll(){

//         let sql = `
//             SELECT * FROM admin;
//         `;
//         return db.execute(sql);
//     }

//     static async addAdmin(email, password) {
//         let sql = `
//             INSERT INTO admin
//             (email, password)
//             VALUES (
//                 '${email}',
//                 '${password}'
//             )
//         `;
//         return db.execute(sql);
//     }
//     static async getAdminData(email) {
//         let sql = `
//             SELECT * FROM admin
//             WHERE email = '${email}'
//         `;
//         const [rows] = await db.query(sql);
//         return rows;
//     }
// }

// Mongoose Schema.

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Admin', adminSchema);