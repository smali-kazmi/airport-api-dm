var fixtures = require('../fixtures');
var should = require('should');
var saveService = require('../../services/save');
var _ = require('lodash');
describe('This section contains save service test cases', function() {

  describe('#record invalid data data set', function(){
    
    it('should be in catch Invalid data', function(done){
      saveService
        .record({})
        .then(function(record){
          done('Should not in then')
        })
        .catch(function(error){
          error.should.equal('Invalid data');
          done();
        });
    });  

    it('should be in catch because Invalid User Data', function(done){
      var data = _.assignIn({}, 
                  fixtures.Users.invalidData[0],
                  fixtures.Airports.validData[0],
                  fixtures.Reviews.validData[0]
                );

      saveService
        .record()
        .then(function(record){
          done('Should not in then')
        })
        .catch(function(error){
          error.should.equal('Invalid data');
          done();
        });
    });  
    
    it('should be in catch because Invalid Airport Data', function(done){
      var data = _.assignIn({}, 
                  fixtures.Users.validData[0],
                  fixtures.Airports.invalidData[0],
                  fixtures.Reviews.validData[0]
                );

      saveService
        .record()
        .then(function(record){
          done('Should not in then')
        })
        .catch(function(error){
          error.should.equal('Invalid data');
          done();
        });
    });  

    it('should be in catch because Invalid Reviews Data', function(done){
      var data = _.assignIn({}, 
                  fixtures.Users.validData[0],
                  fixtures.Airports.validData[0],
                  fixtures.Reviews.invalidData[0]
                );

      saveService
        .record()
        .then(function(record){
          done('Should not in then')
        })
        .catch(function(error){
          error.should.equal('Invalid data');
          done();
        });
    });  
  });
  
});
