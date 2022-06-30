const db = require('../db');

class ApplyDiscount {
    static async findByName(name) {
        try {
            const sql = `
                SELECT * FROM discount
                WHERE name = '${name}'
            `;
            const [rows] = await db.query(sql);
            return rows;
        } catch (error) {
            return error;
        }
    }
}
module.exports = ApplyDiscount;