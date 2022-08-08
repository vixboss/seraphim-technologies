// MySql Model
// const { execute } = require('../db');
// const db = require('../db');

// class ProductType {

//     // constructor(id, title){
//     //     this.id = id;
//     //     this.title = title;
//     // }

//     constructor(title){
//         this.title = title;
//     }

//     save() {
//         let d = new Date();
//         let yyyy = d.getFullYear();
//         let mm = d.getMonth() + 1;
//         let dd = d.getDate();

//         let hh = d.getHours();
//         let min = d.getMinutes();
//         let ss = d.getSeconds();

//         let createdAt = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;

//         let sql = `
//             INSERT INTO productType(
//                 title,
//                 createdAt
//             )
//             VALUES(
//                 '${this.title}',
//                 '${createdAt}'
//             )
//         `;

//         return db.execute(sql);
//     }

//     static update(id, title) {
//         let d = new Date();
//         let yyyy = d.getFullYear();
//         let mm = d.getMonth() + 1;
//         let dd = d.getDate();

//         let hh = d.getHours();
//         let min = d.getMinutes();
//         let ss = d.getSeconds();

//         let createdAtUpdate = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;

//         let sql = `
//             UPDATE productType SET title = '${title}', createdAt = '${createdAtUpdate}' WHERE id = ${id}
//         `;

//         return db.execute(sql);
//     }

//     static findAll() {
//         let sql = `SELECT * from productType ORDER BY createdAt DESC`;
//         return db.execute(sql);
//     }

//     static findById(id) {
//         let sql = `SELECT * FROM productType WHERE id = ${id}`;
//         return db.execute(sql);
//     }

//     static remove(id) {
//         let sql = `DELETE FROM productType WHERE id = ${id}`;
//         return db.execute(sql);
//     }

//     static checkDataExisting(title) {
//         console.log(title);
//         var checkProductTypeExistOfTitle = `
//             SELECT * FROM productType
//             WHERE title = '${title}'
//         `;
        
//         return db.execute(checkProductTypeExistOfTitle);
//     }
// }

// module.exports = ProductType;

// MongoDB Schema.
const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports = new mongoose.model('ProductType', productTypeSchema);
