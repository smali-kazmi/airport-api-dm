var fixtures = require('../fixtures');
var should = require('should');
var saveService = require('../../services/save');
var apiService = require('../../services/api');
var _ = require('lodash');
var async = require('async');
describe('This section contains api service test cases', function() {
  

  require('../lib/testUtil').reset();

  describe('#getAllStats', function(){
    
    it('should return emtpy list', function(done){
      apiService
        .getAllStats()
        .then(function(records){
          records.length.should.equal(0);
          done();
        })
        .catch(function(error){
          done(error);
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
          apiService
            .getAllStats()
            .then(function(records){
              records.length.should.equal(2);
              records[0].should.have.property('id');
              records[0].should.have.property('name');
              records[0].should.have.property('total_reviews');
              records[0].total_reviews.should.equal(3);

              records[1].should.have.property('id');
              records[1].should.have.property('name');
              records[1].should.have.property('total_reviews');
              records[1].total_reviews.should.equal(1);
              done();
            })
            .catch(function(error){
              done(error);
            });
      });
    });
  });

  describe('#getAirportStats', function(){
    
    it('should return emtpy list', function(done){
      apiService
        .getAirportStats(1)
        .then(function(record){
          record.should.eql({});
          done();
        })
        .catch(function(error){
          done(error);
        });
    });

    it('should return emtpy list if no param pass to function', function(done){
      apiService
        .getAirportStats()
        .then(function(record){
          record.should.eql({});
          done();
        })
        .catch(function(error){
          done(error);
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
          apiService
            .getAirportStats(1)
            .then(function(record){
              
              record.should.have.property('id');
              record.should.have.property('name');
              record.should.have.property('link');
              record.should.have.property('title');
              record.should.have.property('reviews');
              record.should.have.property('average');
              record.should.have.property('recommended');

              record.reviews.should.eql(3);
              record.average.should.eql(1);
              record.recommended.should.eql(0);

              done();
            })
            .catch(function(error){
              done(error);
            });
      });
    });

  });

  describe('#getAirportReviews', function(){

    it('should return emtpy list', function(done){
      apiService
        .getAirportReviews(1)
        .then(function(record){
          record.length.should.eql(0);
          done();
        })
        .catch(function(error){
          done(error);
        });
    });

    it('should return emtpy list if id not passed', function(done){
      apiService
        .getAirportReviews()
        .then(function(record){
          record.length.should.eql(0);
          done();
        })
        .catch(function(error){
          done(error);
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
          apiService
            .getAirportReviews(1)
            .then(function(records){
              
              records.length.should.eql(3);
              records[0].should.have.property('id');
              records[0].should.have.property('overall_rating');
              records[0].should.have.property('recommended');
              records[0].should.have.property('date');
              records[0].should.have.property('content');
              records[0].should.have.property('author');

              records[0].author.should.be.an.instanceOf(Object);
              records[0].author.should.have.property('id');
              records[0].author.should.have.property('name');
              records[0].author.should.have.property('country');
              
              done();
            })
            .catch(function(error){
              done(error);
            });
      });
    });

  });

});
