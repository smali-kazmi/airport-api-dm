
var apiService = require('../services/api');


exports.getAllStats = function(req, res) {
  
  apiService
    .getAllStats()
    .then(function(stats){
      res.json(stats);
    })
    .catch(function(error){
      res.status(500).json({'message': 'Internal Server Error'});
    });
};

exports.getAirportStats = function(req, res) {

  apiService
    .getAirportStats(req.params.airport_id)
    .then(function(stats){
      res.json(stats);
    })
    .catch(function(error){
      console.log(error);
      res.status(500).json({'message': 'Internal Server Error'});
    });
};

exports.getAirportReviews = function(req, res) {

  apiService
    .getAirportReviews(req.params.airport_id)
    .then(function(reviews){
      res.json(reviews);
    })
    .catch(function(error){
      console.log(error);
      res.status(500).json({'message': 'Internal Server Error'});
    });
};