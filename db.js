// const firebase = require('firebase-admin');
// const config = require('./config');

// const db = firebase.initializeApp(config.firebaseConfig);

// module.exports = db;

require('dotenv').config();
const mysql = require('mysql2');
 
// Create connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

module.exports = db.promise();