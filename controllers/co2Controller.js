var db = require('../config/connect');

/* SELECT Carbon dioxide data from the database filtered by date */
exports.filterByDate = async function(req, res, next ) {
    var date = new Date(req.body.filterDate);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    var results = {
            title: "Carbon dioxide (CO2)",
            rowsData: []
    }

    
    db.serialize(() => {
        
        let sql = `SELECT Date_n_Time, Value, 
                    SUBSTR(Date_n_Time, 1, 4) AS Year, 
                    SUBSTR(Date_n_Time, 6, 2) AS Month,
                    SUBSTR(Date_n_Time, 9, 2) AS Day
                    FROM CO2Data 
                    WHERE 
                    Year = '${ year }'
                    AND 
                    Month = '${ month < 10 ? '0' + month : month }'
                    AND
                    Day = '${  day < 10 ? '0' + day : day }'`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                res.send("ERROR: could not retrieve data.");
            }
            results.rowsData  = rows;
            res.json(results);
        });
    });
}

/* Render Carbon dioxide page */
exports.carbone_dioxide = function(req, res, next) {

    var results = {
        data : { title: 'Carbon Dioxide (CO2)' }
    };

    res.render('carbon_dioxide', results);
};
