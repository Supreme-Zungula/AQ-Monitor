let db = require('../config/connect');
let co2_controller = require('./co2Controller');
let tvoc_controller = require('.//tvocController');

exports.getLiveData_CO2 = function(req, res, next) {
    co2_controller.filterByDate(req, res, next);
};

exports.getLiveData_TVOC = function(req, res, next) {
    tvoc_controller.filterByDate(req, res, next);
};