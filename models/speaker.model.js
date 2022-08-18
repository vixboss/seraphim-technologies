// const { execute } = require('../db');
// const db = require('../db');

// class Speaker {

//     constructor(name, url){
//         this.name = name;
//         this.url = url;
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
//             INSERT INTO speakers(
//                 name,
//                 url,
//                 createdAt
//             )
//             VALUES(
//                 '${this.name}',
//                 '${this.url}',
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

//     static checkDataExisting(name, url) {
//         console.log(name, url);
//         var checkSpeakerExistOfNameAndUrl = `
//             SELECT * FROM speakers
//             WHERE name = '${name}' AND url = '${url}'
//         `;
        
//         return db.execute(checkSpeakerExistOfNameAndUrl);
//     }
// }

// module.exports = Speaker;

const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    qualification: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports = new mongoose.model('Speaker', speakerSchema);