var db = require('../config/connect');

/* SELECT  TVOC data filter by date */
exports.filterByDate = async function(req, res, next ) {
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
            res.json(results);
        });
    });
};

exports.total_voc = function(req, res, next) {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    
    var results = {
        data : {
            title: 'Total Volatile Organic Compounds (TVOC).',
            rows: []
        }
    };
    
    // let sql = `SELECT Date_n_Time AS DNT, Value FROM VOCData LIMIT ${50}`;
    let sql = `SELECT Date_n_Time AS DNT, Value, 
                SUBSTR(Date_n_Time, 1, 4) AS Year, 
                SUBSTR(Date_n_Time, 6, 2) AS Month,
                SUBSTR(Date_n_Time, 9, 2) AS Day
                FROM VOCData 
                WHERE 
                Year = '${ year }'
                AND 
                Month = '${ month < 10 ? '0' + month : month }'
                AND
                Day = '${  day < 10 ? '0' + day : day }'
                LIMIT ${50}`;

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
};
