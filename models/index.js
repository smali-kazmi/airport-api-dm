"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..', 'config', 'config.js'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

fs.readdirSync(__dirname + '/api').forEach(function(file) {
  var filepath = path.join(__dirname+ '/api', file);

  if(fs.lstatSync(filepath).isDirectory() ) {
    fs.readdirSync(filepath).forEach(function(file){
      var model = sequelize.import(path.join(filepath, file));
      db[model.name] = model;
    })
  } else {
    var model = sequelize.import(filepath);
    db[model.name] = model;
  }

});

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync();

global.db = db;

module.exports = db;