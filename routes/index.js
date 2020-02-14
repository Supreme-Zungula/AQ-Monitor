var express = require('express');
var router = express.Router();
var co2Controller = require('../controllers/co2Controller');
var tvocController = require('../controllers/tvocController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/live');
});

/* GET Carbon dioxide page. */
router.get('/CO2', function(req, res, next) {
  co2Controller.carbone_dioxide(req, res, next);
});

/* GET Total volatile organic compounds page */
router.get('/tvoc', (req, res, next) => {
  tvocController.total_voc(req, res, next);
});

/* POST date to filter by */
router.post('/CO2/graph', (req, res, next) => {
  co2Controller.filterByDate(req, res, next);  
});

/* POST date to filter by */
router.post('/tvoc/graph', (req, res, next) => {
  tvocController.filterByDate(req, res, next); 
});

module.exports = router;
