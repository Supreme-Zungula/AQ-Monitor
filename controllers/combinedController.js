var db = require('../config/connect');

/* GET Carbon dioxide data from the database */
exports.retrieve_co2 = async function(req, res, next ) {
    var results = {
            title: "Carbon dioxide (CO2)",
            rowsData: []
    }

    db.serialize(() => {
        let  co2_sql = `SELECT Date_n_Time AS DNT, Value FROM CO2Data LIMIT ${500} `;
       
        db.all(co2_sql, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.send("ERROR: could not retrieve data.");
            }
            results.rowsData = rows;
            res.json(results);
        });
    });
}

/* GET Totol Volatile Compounds Data from the database  */
exports.retrieve_tvoc = async function(req, res, next ) {
    var results = {
            title: "Carbon dioxide (CO2)",
            rowsData: []
    }

    db.serialize(() => {
        let  co2_sql = `SELECT Date_n_Time AS DNT, Value FROM VOCData LIMIT ${500}`;
       
        db.all(co2_sql, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.send("ERROR: could not retrieve data.");
            }
            results.rowsData = rows; 
            res.json(results);
        });
    });
}

/* Get combined data */
exports.combined_data = function(req, res, next) {
    var tvoc_data = {
        title: "Total volatile organic compounds (TVOC)",
        rows: []
    }

    var co2_data = {
        title: "Carbon dioxide (CO2)",
        rows: []
    }

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
}