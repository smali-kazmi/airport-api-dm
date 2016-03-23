var express = require('express');
var router = express.Router();
var ApiController = require('../controllers/api');

router.get('/', function(req, res, next){
  res.send('Yo Yo!!');
});
router.get('/all/stats', ApiController.getAllStats);
router.get('/:airport_id/stats', ApiController.getAirportStats);
router.get('/:airport_id/reviews', ApiController.getAirportReviews);

module.exports = router;
