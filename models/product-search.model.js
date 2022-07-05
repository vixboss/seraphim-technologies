const db = require("../db");

class ProductSearch {
    static async searchAll(name) {
        try {
            const sql = `
                SELECT * 
                FROM collections
                WHERE name LIKE '%${name}%'
                `;
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
}

module.exports = ProductSearch;