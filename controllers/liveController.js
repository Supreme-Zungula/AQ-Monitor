let db = require('../config/connect');
let co2_controller = require('./co2Controller');
let tvoc_controller = require('.//tvocController');

exports.getLiveData_CO2 = function(req, res, next) {
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
};

exports.getLiveData_TVOC = function(req, res, next) {
    var date = new Date(req.body.filterDate);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var results = {
            title: "Carbon dioxide (CO2)",
            rowsData: []
    };
    
    db.serialize(() => {
        
        let sql = `SELECT Date_n_Time, Value, 
                    SUBSTR(Date_n_Time, 1, 4) AS Year, 
                    SUBSTR(Date_n_Time, 6, 2) AS Month,
                    SUBSTR(Date_n_Time, 9, 2) AS Day
                    FROM VOCData 
                    WHERE 
                    Year = '${ year }'
                    AND 
                    Month = '${ month < 10 ? '0' + month : month }'
                    AND
                    Day = '${  day < 10 ? '0' + day : day }'`;

        db.all(sql, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.send("ERROR: could not retrieve data.");
            }
            results.rowsData = rows;
            console.log(results)
            res.json(results);
        });
    });
}