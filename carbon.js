var fs = require('fs');
var app = require('express')();
var http = require('http').Server(app);

var mkdirp = require('mkdirp');
var express = require("express");


app.get('/', function(req, res){
  res.sendFile(__dirname + '/static/writer.html');
});


app.use('/external/', express.static(__dirname + "/static/"));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});


var port = 8080;
http.listen(port, function(){
  console.log('Carbon server started. listening on port ' + port);
});
