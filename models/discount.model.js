// const db = require('../db');

// class Discount {
//     constructor(name, type, value, validity) {
//         this.name = name;
//         this.type = type;
//         this.value = value;
//         this.validity = validity;
//     }

//     async save() {
//         let d = new Date();
//         let yyyy = d.getFullYear();
//         let mm = d.getMonth() + 1;
//         let dd = d.getDate();

//         let hh = d.getHours();
//         let min = d.getMinutes();
//         let ss = d.getSeconds();

//         let createdAt = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;

//         const sql = `
//             INSERT INTO discount(
//                 name,
//                 type,
//                 value,
//                 validity,
//                 createdAt,
//                 status
//             )
//             VALUES(
//                 '${this.name}',
//                 '${this.type}',
//                 ${this.value},
//                 ${this.validity},
//                 '${createdAt}',
//                 'Active'
//             )
//         `;
//         await db.query(sql); 
//     }

//     static checkDataExisting(name) {
//         const getAllSQL = `
//             SELECT * FROM discount 
//             WHERE name = '${name}'
//         `;
//         return db.execute(getAllSQL);
//     }

//     static async findAll() {
//         try {
//             const sql = `SELECT * FROM discount`;
//             const [rows] = await db.query(sql);
            
//             return rows;
//         } catch (error) {
//             return error;
//         }
//     }

//     static async findById(id) {
//         try {
//             const sql = `SELECT * FROM discount WHERE id = ${id}`;
//             const [rows] = await db.query(sql);
//             return rows;
//         } catch (error) {
//             return error;
//         }
//     }
//     static async deleteById(id) {
//         try {
//             const sql = `DELETE FROM discount WHERE id = ${id}`;
//             const [rows] = await db.query(sql);
//             return rows;
//         } catch (error) {
//             return error;
//         }
//     }

//     static async update(id, body) {
//         try {
//             let d = new Date();
//             let yyyy = d.getFullYear();
//             let mm = d.getMonth() + 1;
//             let dd = d.getDate();

//             let hh = d.getHours();
//             let min = d.getMinutes();
//             let ss = d.getSeconds();

//             let createdAt = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;

//             const name = body.discountName;
//             const type = body.discountType;
//             const value = body.discountValue;
//             const validity = body.discountValidity;
//             const sql = `
//                 UPDATE discount 
//                 SET 
//                     name = '${name}',
//                     type = '${type}',
//                     value = ${value},
//                     validity = ${validity},
//                     createdAt = '${createdAt}', 
//                     status = 'Active'
//                 WHERE id = ${id}
//             `;
//             const [rows] = await db.query(sql);
//             return rows;
//         } catch (error) {
//             return error;
//         }
//     }
// }
// module.exports = Discount;

// *********************************** MongoDB **************************

const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    validity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
});

module.exports = new mongoose.model('Discount', discountSchema);