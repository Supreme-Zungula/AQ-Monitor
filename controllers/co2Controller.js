var db = require('../config/connect');

exports.carbone_dioxide = function(req, res, next) {
    var results = {
        data : {

            title: 'Carbon Dioxide (CO2)',
            rows: []
        }
    };
    
    let sql = `SELECT Date_n_Time AS DNT, Value FROM CO2Data LIMIT ${50}`;
    db.serialize(() => {
        db.each(sql, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.send("ERROR: could not retrieve data.");
            }
            results.data.rows.push(rows);
        });
        res.render('carbon_dioxide', results);
    });
}
