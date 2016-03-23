var fixtures = require('../fixtures');
var should = require('should');
var saveService = require('../../services/save');
var apiService = require('../../services/api');
var _ = require('lodash');

describe('This section contains api service test cases', function() {
  
  beforeEach(function(){
    return db.sequelize.sync({force: true});
  });

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
      _.each(records, function(r){
        promises.push(saveService.record(r));
      });


      RSVP
        .all(promises)
        .then(function(){
            apiService
              .getAllStats()
              .then(function(records){
                console.log(records);
                records.length.should.equal(2);
                record[0].should.have.property('id');
                record[0].should.have.property('name');
                record[0].should.have.property('total_reviews');
                record[0].total_reviews.should.equal(3);
                record[1].total_reviews.should.equal(1);
                done();
              })
              .catch(function(error){
                done(error);
              });
        })
        .catch(function(error){
          done(error)
        })

      
    });


  });

});
