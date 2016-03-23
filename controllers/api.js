
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