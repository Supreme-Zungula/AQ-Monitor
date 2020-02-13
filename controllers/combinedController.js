var db = require('../config/connect');

/* Get combined data */
exports.combined_data = function(req, res, next) {
    /* Total volation organic compounds data */
    var tvoc_data = {
        title: "Total volatile organic compounds (TVOC)",
        rows: []
    }

    /* Carbon dioxide data */
    var co2_data = {
        title: "Carbon dioxide (CO2)",
        rows: []
    }

    /* combined data to send back  */
    var results = {
        title: 'Air quality monitor',
        tvoc_data: Object,
        co2_data: Object
    };
    
    let  co2_sql = `SELECT Date_n_Time AS DNT, Value FROM CO2Data LIMIT ${20}`;
    
    db.serialize(() => {
        db.each(co2_sql, [], (err, row) => {
            if (err) {
                console.error(err.message);
                res.send("ERROR: could not retrieve data.");
            }
            co2_data.rows.push(row)
        });
    });

    let tvoc_sql = `SELECT Date_n_Time AS DNT, Value FROM VOCData LIMIT ${20}`

    db.serialize( () => {
        db.each(tvoc_sql, (err, row) => {
            if (err) {
                console.error(err.message);    
                res.send("ERROR: Could not retrieve data.");
            }
            tvoc_data.rows.push(row);
        });
    });

    results.tvoc_data = tvoc_data;
    results.co2_data = co2_data;
    return(results )
};

