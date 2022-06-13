const db = require("../db");

class Admin {
    static findAll(email, password){

        let sql = `
            SELECT * FROM admin WHERE email = '${email}' AND password = '${password}'
        `;
        return db.execute(sql);
    }
}

module.exports = Admin;