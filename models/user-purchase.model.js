const db = require('../db');

class UserPurchase {
    constructor(name, email, phone, orderId, total_amount, gross_amount, items, deliveryStatus, merchant){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.orderId = orderId;
        this.total_amount = total_amount;
        this.gross_amount = gross_amount;
        this.items = items;
        this.deliveryStatus = deliveryStatus;
        this.merchant = merchant; 
    }

    async save() {
        let d = new Date();
            let yyyy = d.getFullYear();
            let mm = d.getMonth() + 1;
            let dd = d.getDate();

            let hh = d.getHours();
            let min = d.getMinutes();
            let ss = d.getSeconds();

            let createdAt = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
        try {
            const sql = `
                INSERT INTO payer(
                    name,
                    email, 
                    phone,
                    order_id,
                    total_amount,
                    gross_amount,
                    merchant, 
                    createdAt
                )
                VALUES (
                    '${this.name}',
                    '${this.email}',
                    '${this.phone}',
                    '${this.orderId}',
                    '${this.total_amount}',
                    '${this.gross_amount}',
                    '${this.merchant}',
                    '${createdAt}'
                )
            `;
            const [rows] = await db.query(sql);
            console.log(rows);
            if(rows){

                // Insert into 'orders' Table.
                const insertedId = rows.insertId;
                await Promise.all(
                    this.items.map(async(item) => {
                        var ordersSQL = this.merchant === 'Paypal' ? `
                            INSERT INTO orders 
                            (description, unit_amount, quantity, payerId) 
                            VALUES(
                                '${item.name}',
                                '${item.unit_amount.value}',
                                ${item.quantity},
                                ${insertedId}
                            )` : `
                            INSERT INTO orders 
                            (description, unit_amount, quantity, payerId) 
                            VALUES(
                                '${item.description}',
                                '${(item.price.unit_amount/100).toFixed(2)}',
                                ${item.quantity},
                                ${insertedId}
                            )
                            
                            `;
                        const [rows] = await db.query(ordersSQL);
                        if(rows) {
                            const insertedIdOfOrder = rows.insertId;
    
                            // Insert into 'orderDelivery' Table.
                            var orderDeliverySQL = `
                                INSERT INTO orderDelivery
                                (orderId, deliveryStatus, createdAt)
                                VALUES(
                                    ${insertedIdOfOrder},
                                    ${this.deliveryStatus},
                                    '${createdAt}'
                                )
                            `;
                            db.query(orderDeliverySQL);
                        }
                    })
                );
            }
            else{
                return "Data not inserted.";
            }
        } catch (error) {
            return error;
        }
    }

    static async getAllUserPurchase() {
        try{
            const sql = `
                SELECT 
                    DISTINCT
                    payer.name,
                    payer.email,
                    payer.phone,
                    payer.order_id,
                    payer.total_amount,
                    payer.gross_amount,
                    payer.merchant,
                    payer.createdAt
                FROM payer 
                INNER JOIN orders ON
                    payer.id = orders.payerId
                INNER JOIN orderDelivery ON	
                    orderDelivery.orderId = orders.id
                ORDER BY orderDelivery.createdAt DESC
            `;
            const [rows] = await db.query(sql);
            var newRow = [];
            if(rows) {
                await Promise.all(
                    rows.map(async (row) => {
    
                        const orderSQL = `
                            SELECT 
                                orders.description,
                                orders.unit_amount,
                                orders.quantity,
                                orderDelivery.deliveryStatus,
                                orderDelivery.createdAt,
                                orderDelivery.orderId
                            FROM payer 
                            INNER JOIN orders
                                ON payer.id = orders.payerId
                            INNER JOIN orderDelivery
                                ON orderDelivery.orderId = orders.id
                            WHERE payer.order_id = '${row.order_id}'
                        `;
                        const [rows] = await db.query(orderSQL);
                        newRow.push({...row, items: rows });
                    })
                );
            }
            return newRow;
        }
        catch(error) {
            return error;
        }
    }

    static async updateDeliveryStatus(data) {
        try {
            let d = new Date();
            let yyyy = d.getFullYear();
            let mm = d.getMonth() + 1;
            let dd = d.getDate();

            let hh = d.getHours();
            let min = d.getMinutes();
            let ss = d.getSeconds();

            let createdAt = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;

            const {id, status} = data;
            console.log(id);
            console.log(status);
            
            const updateSQL = `
                UPDATE orderDelivery
                SET	
                    deliveryStatus = ${status},
                    createdAt = '${createdAt}'
                WHERE
                    orderId = ${id}
            `;
            const [rows] = await db.query(updateSQL);
            console.log(rows);
            return rows;
        } catch (error) {
            return error;
        }
    }
}

module.exports = UserPurchase;