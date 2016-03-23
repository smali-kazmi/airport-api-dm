var db = require('../models');
var async = require('async');
var _ = require('lodash');
var RSVP = require('rsvp');


exports.getAllStats = function() {

  var RSVP = require('rsvp');
  var promise = new RSVP.Promise(function(resolve, reject) {
    db.Airport
      .getAllStats()
      .then(function(stats){
        resolve(stats);
      })
      .catch(function(error){
        reject({});
      });
  });
  return promise;
};