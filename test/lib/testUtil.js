exports.reset = function() {
    beforeEach(function(done){
    return global.db.sequelize.drop({logging: console.log, cascade: true})
      .then(function() {
      return global.db.sequelize.sync({logging: console.log})
        .then(function(){
          done();
        });
    });
  });
}