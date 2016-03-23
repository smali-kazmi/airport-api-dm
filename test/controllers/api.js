var fixtures = require('../fixtures');
var should = require('should');
var saveService = require('../../services/save');

var _ = require('lodash');
var async = require('async');

var app = require('../../app');
var request = require('supertest');

describe('This section contains api service test cases', function() {
  

  require('../lib/testUtil').reset();

  describe('GET /api/all/stats', function(){
    var url = '/api/all/stats';
    
    it('should return emtpy list', function(done){
      request(app)
        .get(url)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          res.body.length.should.equal(0)
          done();
        });
    });

    it('should return all records', function(done){

      var RSVP = require('rsvp');
      var records = fixtures.customData();
      var promises = [];

      async.eachSeries(records, function(record, cb){
        saveService
          .record(record)
          .then(function(saved){
            cb();
          })
          .catch(function(){
            cb();
          });
      }, function(error){
        request(app)
          .get(url)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            res.body.should.be.instanceof(Array);
            res.body.length.should.equal(2);
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('total_reviews');
            res.body[0].total_reviews.should.equal(3);

            res.body[1].should.have.property('id');
            res.body[1].should.have.property('name');
            res.body[1].should.have.property('total_reviews');
            res.body[1].total_reviews.should.equal(1);

            done();
          });
          
      });
    });
    
  });

  describe('GET /api/[airport]/stats', function(){
    var url = '/api/1/stats';
    it('should return emtpy list', function(done){
      request(app)
        .get(url)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.should.eql({})
          done();
        });
    });

    it('should return all records', function(done){

      var RSVP = require('rsvp');
      var records = fixtures.customData();
      var promises = [];

      async.eachSeries(records, function(record, cb){
        saveService
          .record(record)
          .then(function(saved){
            cb();
          })
          .catch(function(){
            cb();
          });
      }, function(error){
        request(app)
          .get(url)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.should.have.property('link');
            res.body.should.have.property('title');
            res.body.should.have.property('reviews');
            res.body.should.have.property('average');
            res.body.should.have.property('recommended');

            res.body.reviews.should.eql(3);
            res.body.average.should.eql(1);
            res.body.recommended.should.eql(0);

            done();
          });
            
      });
    });

  });


  describe('GET /api/[airport]/reviews', function(){
    var url = '/api/1/reviews';
    it('should return emtpy list', function(done){

      request(app)
        .get(url)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          res.body.length.should.equal(0)
          done();
        });
    });

    it.only('should return all records', function(done){

      var RSVP = require('rsvp');
      var records = fixtures.customData();
      var promises = [];

      async.eachSeries(records, function(record, cb){
        saveService
          .record(record)
          .then(function(saved){
            cb();
          })
          .catch(function(){
            cb();
          });
      }, function(error){
        request(app)
          .get(url)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            res.body.should.be.instanceof(Array);

            res.body.length.should.eql(3);
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('overall_rating');
            res.body[0].should.have.property('recommended');
            res.body[0].should.have.property('date');
            res.body[0].should.have.property('content');
            res.body[0].should.have.property('author');

            res.body[0].author.should.be.an.instanceOf(Object);
            res.body[0].author.should.have.property('id');
            res.body[0].author.should.have.property('name');
            res.body[0].author.should.have.property('country');

            done();
          });
          
      });
    });

  });


  

});
