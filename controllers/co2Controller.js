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

/* GET Carbon dioxide data from the database filtered by date */
exports.filterByDate = async function(req, res, next ) {
    var date = new Date(req.body.filterDate);
    var day = date.getDay();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    console.log("Day: " + day);
    console.log("month: " + month);
    console.log("year: " + year);

    var results = {
            title: "Carbon dioxide (CO2)",
            rowsData: []
    }

    
    db.serialize(() => {
        
        let  sql = `SELECT Date_n_Time, Value, 
                    SUBSTR(Date_n_Time,9,2) as Day, 
                    SUBSTR(Date_n_Time,6,2) as Month, 
                    SUBSTR(Date_n_Time,1,4) as Year
                    FROM CO2Data 
                    WHERE
                    Year = '${ day < 10 ? '0' + day : day }'
                    AND 
                    Month = '${ month < 10 ? '0' + month : month }' 
                    Day = '${year}'
                    AND
                    LIMIT ${30}`;

        db.all(sql, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.send("ERROR: could not retrieve data.");
            }
            results.rowsData = rows;
            console.log(results.rowsData);
            res.send(results);
        });
    });
}