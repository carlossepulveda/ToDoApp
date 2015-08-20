//server.js
var express = require("express");
var TaskController = require('./controllers/TaskController.js');

global.appDir = __dirname;

var app = express();

//Register controllers
new TaskController(app);


var server = app.listen(3001, function () {
  console.log('App listening on port %s', server.address().port);
});