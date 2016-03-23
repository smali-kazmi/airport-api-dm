var express = require('express');
var router = express.Router();
var ApiController = require('../controllers/api');

router.get('/', function(req, res, next){
  res.send('Yo Yo!!');
});
router.get('/all/stats', ApiController.getAllStats);
router.get('/:airport_id/stats', ApiController.getAirportStats);

module.exports = router;
