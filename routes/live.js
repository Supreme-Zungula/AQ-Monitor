let express = require('express');
let router = express.Router();
let liveController = require('../controllers/liveController');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('live', {title: "Live data reading"});
});

router.post('/tvoc', (req, res, next) => {
  liveController.getLiveData_TVOC(req, res, next);
});

router.post('/CO2', (req, res, next) => {
  liveController.getLiveData_CO2(req, res, next);
});

module.exports = router;
