
var db = require('../models');
var async = require('async');
var _ = require('lodash');
var RSVP = require('rsvp');

var DefaultDataValidator = function(data) {

  var validateUserData = function() {

    if(_.has(data, 'author') && _.has(data, 'author_country')) {
      return {
        name: data['author'],
        country: data['author_country'],
      }
    } else {
      return null;
    }
  };

  var validateAirportData = function() {
    if(_.has(data, 'airport_name')) {
      return {
        name: data['airport_name'],
        link: data['link'],
        title: data['title'],
      }
    } else {
      return null;
    }
  };

  var validateReview = function() {
    if(_.has(data, 'date') && _.has(data, 'content')) {
      return data;
    } else {
      return null;
    }
  };

  this.getUser = function() {
    return validateUserData();
  };

  this.getAirport = function() {
    return validateAirportData();
  };

  this.getReview = function() {
    return _.omit(validateReview(), ['author', 'author_country', 'airport_name', 'link', 'title']);
  };

  this.isValid = function() {
    return validateReview() && validateAirportData() && validateUserData();
  }
};



exports.record = function(data, type) {

  var RSVP = require('rsvp');
 
  var promise = new RSVP.Promise(function(resolve, reject) {
    
    var dataValidator = new DefaultDataValidator(data);

    if(dataValidator.isValid()) {

      async.waterfall([
        function(next) {
          var airportData = dataValidator.getAirport();
          db.Airport
            .save(airportData)
            .then(function(airport){
              next(null, {airport: airport[0]})
            })
            .catch(function(error){
              next(error);
            });
        },
        function(savedData, next) {
          var userData = dataValidator.getUser();
          db.User
            .save(userData)
            .then(function(user){
              savedData['user'] = user[0];
              next(null, savedData);
            })
            .catch(function(error){
              next(error);
            });
        },
        function(savedData, next) {
          var reviewData = dataValidator.getReview();
          reviewData['fk_user_id'] = savedData.user.id;
          reviewData['fk_airport_id'] = savedData.airport.id;
          db.Review
            .save(reviewData)
            .then(function(review){
              savedData['review'] = review;
              next(null, savedData);
            })
            .catch(function(error){
              next(error);
            });
        }
      ], function(error, savedData){

        if(error) {
          console.log(error);
          reject('Cannot save data');
        } else {
          resolve(savedData);
        }

      });

      
    } else {
      reject('Invalid data');  
    }
    
  });

  return promise;

};