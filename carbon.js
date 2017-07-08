var fs = require('fs');
var app = require('express')();
var http = require('http').Server(app);

var mkdirp = require('mkdirp');
var express = require("express");
var bodyParser = require('body-parser')

mkdirp('data');
mkdirp('data/notebooks');
mkdirp('data/textbooks');
mkdirp('data/papers');
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


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.post('/save', function(req, res) {
    var name = req.body.name,
        data = req.body.data;

        var logger = fs.createWriteStream(__dirname + "/data/papers/" + name, {
          flags: 'w'
        })

        logger.write(data);

        logger.end() // close string
});

var port = 8080;
http.listen(port, function(){
  console.log('Carbon server started. listening on port ' + port);
});
