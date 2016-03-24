
var apiService = require('../services/api');

/**
 * @api {get} /api/all/stats Returns a collection of all airports stats
 * @apiName Get all Stats
 * @apiGroup Airport
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object[]} stats                  The collection airport review stats ordered by the count of reviews.
 * @apiSuccess (200) {Number}   stats.id               id of the airport.
 * @apiSuccess (200) {String}   stats.name             name of the airport.
 * @apiSuccess (200) {Number}   stats.total_reviews    count of reviews in system.
 *
 * @apiError (500) {Object} object error message object 
 * @apiError (500) {Object} object.message contains the error message 
 */

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

/**
 * @api {get} /api/:airport_id/stats Returns an object of airport stats
 * @apiName Get Airport Stats
 * @apiGroup Airport
 * @apiParam {Number} airport_id Airport unique ID.
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Number}   id      id of the airport.
 * @apiSuccess (200) {String}   name    name of the airport.
 * @apiSuccess (200) {String}   link    link of the airport.
 * @apiSuccess (200) {String}   title    title of the airport.
 * @apiSuccess (200) {Number}   reviews    count of reviews.
 * @apiSuccess (200) {Number}   average    average of "overall_rating".
 * @apiSuccess (200) {Number}   recommended   count of recommendations "recommended"
 *
 * @apiError (500) {Object} object error message object 
 * @apiError (500) {Object} object.message contains the error message 
 */

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

/**
 * @api {get} /api/:airport_id/reviews?overall_rating=0 Returns an object of airport reviews
 * @apiName Get List of all Airport's Review
 * @apiGroup Airport
 * @apiParam {Number} airport_id Airport unique ID.
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Number}   id      id of the review.
 * @apiSuccess (200) {Number}   overall_rating    overall rating of the review.
 * @apiSuccess (200) {Number}   recommended    is recommended airport [1 = Yes | 0 = No].
 * @apiSuccess (200) {Date}     date    date of review.
 * @apiSuccess (200) {Object} author  Object of review author.
 * @apiSuccess (200) {Number} author.id  id of the author.
 * @apiSuccess (200) {String} author.name  name of the author.
 * @apiSuccess (200) {String} author.country  country of the author.
 * 
 * @apiError (500) {Object} object error message object 
 * @apiError (500) {Object} object.message contains the error message 
 * 
 */

exports.getAirportReviews = function(req, res) {

  apiService
    .getAirportReviews(req.params.airport_id, req.query.overall_rating)
    .then(function(reviews){
      res.json(reviews);
    })
    .catch(function(error){
      console.log(error);
      res.status(500).json({'message': 'Internal Server Error'});
    });
};