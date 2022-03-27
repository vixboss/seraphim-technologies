const db = require("../db");

class Product {
    constructor(imageUrl, name, price, productDescription, description, detailFields, title, heading, status, date, duration, time, speakerName, createdAt){
        this.imageUrl = imageUrl;
        this.name = name;
        this.price = price;
        this.productDescription = productDescription;
        this.description = description;
        this.detailFields = detailFields;
        this.title = title;   
        this.heading = heading;
        this.status = status;
        this.date = date;
        this.duration = duration;
        this.time = time;
        this.speakerName = speakerName;
        this.createdAt = createdAt;
    }

    save() {

        var sql = "SELECT * from product";
        // var sql = `
        //     INSERT INTO product (
        //         imageUrl,
        //         productName,
        //         price,
        //         description,
        //         detailFields,
        //         title,
        //         productHeading,
        //         status,
        //         date,
        //         duration,
        //         time,
        //         speakerName,
        //         createdAt,
        //     )
        //     VALUES(
        //         '${this.imageUrl}',
        //         '${this.name}',
        //         '${this.price}',
        //         '${this.description}',
        //         '${this.detailFields}',
        //         '${this.title}',
        //         '${this.heading}',
        //         '${this.status}',
        //         '${this.date}',
        //         '${this.duration}',
        //         '${this.time}',
        //         '${this.speakerName}',
        //         '${this.createdAt}',
        //     )
        // `;
        return db.execute(sql);
    }

    static checkDataExisting() {
        var checkProductExistOfTitle = `
            SELECT * FROM product
            WHERE title = '${this.title}' AND productName = '${this.name}'
        `;
        return db.execute(checkProductExistOfTitle);
    }

}

module.exports = Product;