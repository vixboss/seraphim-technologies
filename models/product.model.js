const db = require("../db");
const multipleInsertQuery = require('../db.queries');
const singleInsertQuery = require('../db.queries');
const { findAll } = require("./merchandise.model");

class Product {
    constructor(imageUrl, name, merchandise, description, detailFieldTxtArea, title, heading, date, duration, time, speakerName, createdAt, titleId){
        this.imageUrl = imageUrl;
        this.name = name;
        this.merchandise = merchandise;
        this.description = description;
        this.detailFieldTxtArea = detailFieldTxtArea;
        this.title = title.title;   
        this.heading = heading;
        this.date = date;
        this.duration = duration;
        this.time = time;
        this.speakerName = speakerName;
        this.createdAt = createdAt;
        this.titleId = titleId;
    }

    async save() {
        var sql = `
            INSERT INTO collections(
                name,
                imageUrl,
                description,
                detailFieldTxtArea,
                title,
                heading,
                date,
                duration,
                time,
                speakerName,
                createdAt
            )
            VALUES(
                '${this.name}',
                '${this.imageUrl}',
                '${this.description}',
                '${this.detailFieldTxtArea}',
                '${this.title}',
                '${this.heading}',
                '${this.date}',
                '${this.duration}',
                '${this.time}',
                '${this.speakerName}',
                '${this.createdAt}'
            )
        `;
        try {
            const [rows] = await db.query(sql);
            if(rows) {

                // To insert into merchandise
                const insertedId = rows.insertId;
                var values = [];
                this.merchandise.map((merchandise) => {
                    if(merchandise.price !== ''){
                        values.push([merchandise.price, insertedId, merchandise.id]);
                    }
                });

                var merchandiseSql = "INSERT INTO collections_merchandise (price, collection_id, merchandise_id) VALUES ?";
                db.query(merchandiseSql, [values], function(err) {
                    if (err) throw err;
                    db.end();
                });

                // To insert into productType
                const titleId = this.titleId;
                var productTypeSql = "INSERT INTO collections_productType(productType_id, collection_id) VALUES ?";
                const newValueForProductType = [[titleId, insertedId]];
                db.query(productTypeSql, [newValueForProductType], function(err) {
                    if (err) throw err;
                    db.end();
                });

            }
            else{
                return "Data not inserted.";
            }
        } catch (error) {
            return error;
        }
    }

    static checkDataExisting(title, name) {
        var checkProductExistOfTitle = `
            SELECT * FROM collections
            WHERE title = '${title}' AND name = '${name}'
        `;
        
        return db.execute(checkProductExistOfTitle);
    }

    static async findAll() {
        try {
            const sql = `SELECT * FROM collections`;
            const [rows] = await db.query(sql);
            let items = [];
            let productTypeArray = [];
            if(rows){
                await Promise.all(
                rows.map( async (row) => {
                    const collectionId = row.id;
                    const merchandiseAndProductTypeSQL = `
                    SELECT 
                        merchandise.id AS id,
                        CASE	
                            WHEN collections_merchandise.price = 0 THEN null
                            ELSE collections_merchandise.price
                        END AS price,
                        merchandise.title AS name,
                        productType.id AS productType_id
                    FROM collections
                    INNER JOIN collections_productType
                        ON collections.id = collections_productType.collection_id
                        AND collections_productType.collection_id = ${collectionId}
                    INNER JOIN productType
                        ON productType.id = collections_productType.productType_id
                    INNER JOIN collections_merchandise
                        ON collections.id = collections_merchandise.collection_id
                        AND collections_merchandise.collection_id = ${collectionId}
                    RIGHT JOIN merchandise
                        ON merchandise.id = collections_merchandise.merchandise_id
                    `;
                    await db.query(merchandiseAndProductTypeSQL).then(response => {
                        productTypeArray.push(response[0][0].productType_id);
                        items.push({...row, 
                            merchandise: response[0],
                            productType_id: response[0][0].productType_id
                        });
                    });
                }))
                productTypeArray = [...new Set(productTypeArray)];
                var newArray = [];
                let newItemsObj;

                for(var i = 0; i < productTypeArray.length; i++ ){
                    newItemsObj = {
                        items: items.filter(obj => obj.productType_id == productTypeArray[i]).map(obj => obj),
                        title: [...new Set(items.filter(obj => obj.productType_id == productTypeArray[i]).map(obj => obj.title))].toString(),
                        id: productTypeArray[i]
                    };
                    
                    newArray.push(newItemsObj);
                }
                return newArray;
            }
            else{
                return "No record(s) Found.";
            }
        } catch (error) {
            return error;
        }
    }

    static async findById(id) {
        try {
            let sql = `SELECT * FROM collections WHERE id = ${id}`;
            const [rows] = await db.query(sql);
            let newitems = [];
            var productTypeArray = [];
            if(rows){
                const collectionId = rows[0].id;
                const merchandiseAndProductTypeSQL = `
                SELECT
                    merchandise.id AS id,
                    CASE	
                        WHEN collections_merchandise.price = 0 THEN null
                        ELSE collections_merchandise.price
                    END AS price,
                    merchandise.title AS name,
                    productType.id AS productType_id
                FROM collections
                INNER JOIN collections_productType
                    ON collections.id = collections_productType.collection_id
                    AND collections_productType.collection_id = ${collectionId}
                INNER JOIN productType
                    ON productType.id = collections_productType.productType_id
                INNER JOIN collections_merchandise
                    ON collections.id = collections_merchandise.collection_id
                    AND collections_merchandise.collection_id = ${collectionId}
                RIGHT JOIN merchandise
                    ON merchandise.id = collections_merchandise.merchandise_id
                `;
                await db.query(merchandiseAndProductTypeSQL).then(response => {
                    productTypeArray.push(response[0][0].productType_id);
                        newitems.push({...rows[0], 
                            merchandise: response[0],
                            productType_id: response[0][0].productType_id
                        });
                });
            }
            return newitems;
        } catch (error) {
            return error;
        }
    }

    static async updateById(id, body) {
        try {
            const collection_id = id;
            const imageUrl = body.items[0].imageUrl;
            const name = body.items[0].name;
            const title = body.items[0].title.title;
            const titleId = body.items[0].titleId;
            const heading = body.items[0].heading;
            const date = body.items[0].date;
            const duration = body.items[0].duration;
            const time = body.items[0].time;
            const createdAt = body.items[0].createdAt;
            const merchandise = body.items[0].merchandise;
            const speakerName = body.items[0].speakerName;
            const detailFieldTxtArea = body.items[0].detailFieldTxtArea;
            const description = body.items[0].description;
            const sql = `
                UPDATE 
                    collections
                SET 
                    imageUrl = '${imageUrl}',
                    name = '${name}',
                    title = '${title}',
                    heading = '${heading}',
                    date = '${date}',
                    duration = '${duration}',
                    time = '${time}',
                    createdAt = '${createdAt}',
                    speakerName = '${speakerName}',
                    detailFieldTxtArea = '${detailFieldTxtArea}',
                    description = '${description}'
                WHERE
                    id = ${collection_id}
            `;

            const [rows] = await db.query(sql);
            if(rows) {
                merchandise.map((merchand) => {
                    const merchandiseSQL = `
                        UPDATE
                            collections_merchandise
                        SET
                            price = '${merchand.price}'
                        WHERE
                            collections_merchandise.collection_id = ${collection_id}
                            AND
                            collections_merchandise.merchandise_id = ${merchand.id}
                    `;
                    db.query(merchandiseSQL);
                });

                const productTypeSQL = `
                    UPDATE
                        collections_productType
                    SET 
                        collections_productType.productType_id = ${titleId}
                    WHERE
                    collections_productType.collection_id = ${collection_id}
                `;
                db.query(productTypeSQL);
            }

            return "Product Updated Successfully.";

        } catch (error) {
            return error
        }
    }

    static async deleteProductById(id) {
        try {
            const sql = `
                DELETE FROM collections
                WHERE id = ${id}
            `;
            var [rows] = await db.query(sql);
            if(rows.affectedRows !== 0) return "Deleted data successfully.";
            else return "ID doesn't exist.";
        } catch (error) {
            return error;
        }
    }
}
module.exports = Product;