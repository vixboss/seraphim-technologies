// const { execute } = require('../db');
// const db = require('../db');

// class Banner {

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
//             INSERT INTO banner(
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
//             UPDATE banner SET title = '${title}', createdAt = '${createdAtUpdate}' WHERE id = ${id}
//         `;

//         return db.execute(sql);
//     }

//     static findAll() {
//         let sql = `SELECT * from banner ORDER BY createdAt DESC`;
//         return db.execute(sql);
//     }

//     static findById(id) {
//         let sql = `SELECT * FROM banner WHERE id = ${id}`;
//         return db.execute(sql);
//     }

//     static remove(id) {
//         let sql = `DELETE FROM banner WHERE id = ${id}`;
//         return db.execute(sql);
//     }
// }

// module.exports = Banner;

// *********************** MongoDB *********************

const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
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

module.exports = new mongoose.model('Banner', bannerSchema);