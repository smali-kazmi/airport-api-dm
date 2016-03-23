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
            console.log(JSON.stringify(saved));
            cb();
          })
          .catch(function(){
            cb();
          });
      }, function(error){
          apiService
            .getAllStats()
            .then(function(records){
              console.log(records);
              records.length.should.equal(2);
              records[0].should.have.property('id');
              records[0].should.have.property('name');
              records[0].should.have.property('total_reviews');
              records[0].total_reviews.should.equal(3);
              records[1].total_reviews.should.equal(1);
              done();
            })
            .catch(function(error){
              done(error);
            });
      });

      
    });


  });

});
