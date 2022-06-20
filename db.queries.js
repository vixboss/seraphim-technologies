const db = require("./db");

module.exports = {
    multipleInsertQuery : function (sql, values) {
        db.query(sql, [values], function(err) {
            if (err) throw err;
            db.end();
        });
    },
    singleInsertQuery: function(sql, value) {
        db.query(sql, [value], function(err) {
            if (err) throw err;
            db.end();
        });
    }
}