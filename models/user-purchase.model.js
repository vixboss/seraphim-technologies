// const db = require('../db');

// class UserPurchase {
//     constructor(name, email, phone, orderId, total_amount, gross_amount, items, deliveryStatus, merchant){
//         this.name = name;
//         this.email = email;
//         this.phone = phone;
//         this.orderId = orderId;
//         this.total_amount = total_amount;
//         this.gross_amount = gross_amount;
//         this.items = items;
//         this.deliveryStatus = deliveryStatus;
//         this.merchant = merchant; 
//     }

//     async save() {
//         let d = new Date();
//             let yyyy = d.getFullYear();
//             let mm = d.getMonth() + 1;
//             let dd = d.getDate();

//             let hh = d.getHours();
//             let min = d.getMinutes();
//             let ss = d.getSeconds();

//             let createdAt = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
//         try {
//             const sql = `
//                 INSERT INTO payer(
//                     name,
//                     email, 
//                     phone,
//                     order_id,
//                     total_amount,
//                     gross_amount,
//                     merchant, 
//                     createdAt
//                 )
//                 VALUES (
//                     '${this.name}',
//                     '${this.email}',
//                     '${this.phone}',
//                     '${this.orderId}',
//                     '${this.total_amount}',
//                     '${this.gross_amount}',
//                     '${this.merchant}',
//                     '${createdAt}'
//                 )
//             `;
//             const [rows] = await db.query(sql);
//             console.log(rows);
//             if(rows){

//                 // Insert into 'orders' Table.
//                 const insertedId = rows.insertId;
//                 await Promise.all(
//                     this.items.map(async(item) => {
//                         var ordersSQL = this.merchant === 'Paypal' ? `
//                             INSERT INTO orders 
//                             (description, unit_amount, quantity, payerId) 
//                             VALUES(
//                                 '${item.name}',
//                                 '${item.unit_amount.value}',
//                                 ${item.quantity},
//                                 ${insertedId}
//                             )` : `
//                             INSERT INTO orders 
//                             (description, unit_amount, quantity, payerId) 
//                             VALUES(
//                                 '${item.description}',
//                                 '${(item.price.unit_amount/100).toFixed(2)}',
//                                 ${item.quantity},
//                                 ${insertedId}
//                             )
                            
//                             `;
//                         const [rows] = await db.query(ordersSQL);
//                         if(rows) {
//                             const insertedIdOfOrder = rows.insertId;
    
//                             // Insert into 'orderDelivery' Table.
//                             var orderDeliverySQL = `
//                                 INSERT INTO orderDelivery
//                                 (orderId, deliveryStatus, createdAt)
//                                 VALUES(
//                                     ${insertedIdOfOrder},
//                                     ${this.deliveryStatus},
//                                     '${createdAt}'
//                                 )
//                             `;
//                             db.query(orderDeliverySQL);
//                         }
//                     })
//                 );
//             }
//             else{
//                 return "Data not inserted.";
//             }
//         } catch (error) {
//             return error;
//         }
//     }

//     static async getAllUserPurchase() {
//         try{
//             const sql = `
//                 SELECT 
//                     DISTINCT
//                     payer.name,
//                     payer.email,
//                     payer.phone,
//                     payer.order_id,
//                     payer.total_amount,
//                     payer.gross_amount,
//                     payer.merchant,
//                     payer.createdAt
//                 FROM payer 
//                 INNER JOIN orders ON
//                     payer.id = orders.payerId
//                 INNER JOIN orderDelivery ON	
//                     orderDelivery.orderId = orders.id
//                 ORDER BY orderDelivery.createdAt DESC
//             `;
//             const [rows] = await db.query(sql);
//             var newRow = [];
//             if(rows) {
//                 await Promise.all(
//                     rows.map(async (row) => {
    
//                         const orderSQL = `
//                             SELECT 
//                                 orders.description,
//                                 orders.unit_amount,
//                                 orders.quantity,
//                                 orderDelivery.deliveryStatus,
//                                 orderDelivery.createdAt,
//                                 orderDelivery.orderId
//                             FROM payer 
//                             INNER JOIN orders
//                                 ON payer.id = orders.payerId
//                             INNER JOIN orderDelivery
//                                 ON orderDelivery.orderId = orders.id
//                             WHERE payer.order_id = '${row.order_id}'
//                         `;
//                         const [rows] = await db.query(orderSQL);
//                         newRow.push({...row, items: rows });
//                     })
//                 );
//             }
//             return newRow;
//         }
//         catch(error) {
//             return error;
//         }
//     }

//     static async updateDeliveryStatus(data) {
//         try {
//             let d = new Date();
//             let yyyy = d.getFullYear();
//             let mm = d.getMonth() + 1;
//             let dd = d.getDate();

//             let hh = d.getHours();
//             let min = d.getMinutes();
//             let ss = d.getSeconds();

//             let createdAt = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;

//             const {id, status} = data;
//             console.log(id);
//             console.log(status);
            
//             const updateSQL = `
//                 UPDATE orderDelivery
//                 SET	
//                     deliveryStatus = ${status},
//                     createdAt = '${createdAt}'
//                 WHERE
//                     orderId = ${id}
//             `;
//             const [rows] = await db.query(updateSQL);
//             return rows;
//         } catch (error) {
//             return error;
//         }
//     }
//     static async searchUserPurchase(data) {
//         try{
//             const id = data.orderId;
//             const description = data.productName;
//             const email = data.email;
//             const payerName = data.payerName;
//             const newFromDate = data.fromDate;
//             const newToDate = data.toDate;

//             if((data.fromDate === '' && data.toDate !== '') || (data.fromDate !== '' && data.toDate == '')){
//                 return {message: "Enter Both Dates For Searching."};
//             }
//             const sql = (data.fromDate !== '' && data.toDate !== '') ? `
//             SELECT 
//                 DISTINCT
//                 payer.name,
//                 payer.email,
//                 payer.phone,
//                 payer.order_id,
//                 payer.total_amount,
//                 payer.gross_amount,
//                 payer.merchant,
//                 payer.createdAt
//             FROM payer 
//             INNER JOIN orders ON
//                 payer.id = orders.payerId
//             INNER JOIN orderDelivery ON	
//                 orderDelivery.orderId = orders.id
//             WHERE 
//                     payer.order_id LIKE '%${id}%'
//                 AND 
//                     payer.name LIKE '%${payerName}%'
//                 AND
//                     payer.email LIKE '%${email}%'
//                 AND
//                     orders.description LIKE '%${description}%'
//                 AND 
//                 	(payer.createdAt BETWEEN '${newFromDate}' AND '${newToDate}')
//             ORDER BY orderDelivery.createdAt DESC
//             `
//             : 
//             `
//             SELECT 
//                 DISTINCT
//                 payer.name,
//                 payer.email,
//                 payer.phone,
//                 payer.order_id,
//                 payer.total_amount,
//                 payer.gross_amount,
//                 payer.merchant,
//                 payer.createdAt
//             FROM payer 
//             INNER JOIN orders ON
//                 payer.id = orders.payerId
//             INNER JOIN orderDelivery ON	
//                 orderDelivery.orderId = orders.id
//             WHERE 
//                     payer.order_id LIKE '%${id}%'
//                 AND 
//                     payer.name LIKE '%${payerName}%'
//                 AND
//                     payer.email LIKE '%${email}%'
//                 AND
//                     orders.description LIKE '%${description}%'
//             ORDER BY orderDelivery.createdAt DESC
//             `;

//             const [rows] = await db.query(sql);
//             // return rows;
//             var newRow = [];
//             if(rows) {
//                 await Promise.all(
//                     rows.map(async (row) => {
    
//                         const orderSQL = `
//                             SELECT 
//                                 orders.description,
//                                 orders.unit_amount,
//                                 orders.quantity,
//                                 orderDelivery.deliveryStatus,
//                                 orderDelivery.createdAt,
//                                 orderDelivery.orderId
//                             FROM payer 
//                             INNER JOIN orders
//                                 ON payer.id = orders.payerId
//                             INNER JOIN orderDelivery
//                                 ON orderDelivery.orderId = orders.id
//                             WHERE payer.order_id = '${row.order_id}'
//                             AND orders.description LIKE '%${description}%'
//                         `;
//                         const [rows] = await db.query(orderSQL);
//                         newRow.push({...row, items: rows });
//                     })
//                 );
//             }
//             return newRow;
//         }
//         catch(error) {
//             return error;
//         } 
//     }
// }

// module.exports = UserPurchase;

// ************************** MongoDB **************************
const mongoose = require('mongoose');

const itemsSubSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    unit_amount: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    deliveryStatus: {
        type: Boolean,
        required: true
    }
});

const userPurchaseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    order_id: {
        type: String,
        required: true
    },
    total_amount: {
        type: String,
        required: true
    },
    gross_amount: {
        type: String,
        required: true
    },
    merchant: {
        type: String,
        required: true
    }, 
    items: [itemsSubSchema],
    createdAt: {
        type: Date,
        required: true
    }
});
userPurchaseSchema.index({'$**': 'text'});

module.exports = new mongoose.model('UserPurchase', userPurchaseSchema);