const db = require("../db");

class ProductByName {

    static async findByName(name) {
        try {
            let sql = `SELECT * FROM collections WHERE name = '${name}'`;
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

}
module.exports = ProductByName;