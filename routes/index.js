var express = require('express');
var router = express.Router();
var co2Controller = require('../controllers/co2Controller');
var tvocController = require('../controllers/tvocController');
var combinedDataController =  require('../controllers/combinedController');

/* GET home page. */
router.get('/', function(req, res, next) {
  var final_data = combinedDataController.combined_data(req, res, next);
  res.render('index', final_data);
});

/* GET Carbon dioxide page. */
router.get('/CO2', function(req, res, next) {
  co2Controller.carbone_dioxide(req, res, next);
});

/* GET Total volatile organic compounds page */
router.get('/tvoc', (req, res, next) => {
  tvocController.total_voc(req, res, next);
});

router.get('/CO2/graph', (req, res, next) => {
  co2Controller.retrieve_co2(req, res, next);
});


router.get('/tvoc/graph', (req, res, next) => {
  tvocController.retrieve_tvoc(req, res, next);
});

/* POST date to filter by */
router.post('/CO2/graph', (req, res, next) => {
  co2Controller.filterByDate(req, res, next);  
});

module.exports = router;
