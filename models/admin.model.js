const db = require("../db");

class Admin {
    static findAll(email, password){

        let sql = `
            SELECT * FROM admincredentials WHERE email = '${email}' AND password = '${password}'
        `;
        return db.execute(sql);
    }
}

module.exports = Admin;