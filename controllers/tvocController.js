var db = require('../config/connect');

exports.total_voc = function(req, res, next) {
    var results = {
        data : {
            title: 'Total Volatile Organic Compounds (TVOC).',
            rows: []
        }
    };
    
    let sql = `SELECT Date_n_Time AS DNT, Value FROM VOCData LIMIT ${50}`;
    db.serialize(() => {
        db.each(sql, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.send("ERROR: could not retrieve data.");
            }
            results.data.rows.push(rows);
        });
        res.render('total_voc', results); 
    });
}

/* GET Totol Volatile Compounds Data from the database  */
