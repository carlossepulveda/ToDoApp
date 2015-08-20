//server.js
var express = require("express");
var path = require('path');
var TaskController = require('./controllers/TaskController.js');

global.appDir = __dirname;
global.tasks = [];

var app = express();

//Register controllers
new TaskController(app);
app.use(express.static(path.join(__dirname, '../../client')));
app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../../client/index.html'));	
});


var server = app.listen(3001, function () {
  console.log('App listening on port %s', server.address().port);
});