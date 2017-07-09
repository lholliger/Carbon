var fs = require('fs');
var app = require('express')();
var http = require('http').Server(app);

var mkdirp = require('mkdirp');
var express = require("express");
var bodyParser = require('body-parser')
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
mkdirp('data');
mkdirp('data/notebooks');
mkdirp('data/textbooks');
mkdirp('data/papers');
app.get('/', function(req, res){
  res.sendFile(__dirname + '/static/index.html');
});

app.get('/write', function(req, res){
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

        var logger = fs.createWriteStream(__dirname + "/data/" + name, {
          flags: 'w'
        })

        logger.write(data);

        logger.end() // close string
        console.log("file saved to " + "/data/papers/" + name);
});

app.get('/noteread', function(req, res) {
    var name = req.query.pagenumber,
    nbm = req.query.notebook;
        fs.readFile(__dirname + "/data/notebooks/" + nbm + "/" + name + ".cnp", "utf-8", function (err,data) {
  if (err) {
    res.send("NON");

  }
  res.send(data);

});

        console.log("notebook page read from book " + nbm +  " at page " + name);
});

app.get('/createnotebook', function(req, res) {
    var name  = req.query.name;

    mkdirp('data/notebooks/' + name);

        console.log("new notebook by the name of " + name);
});


app.use('/sheet/', express.static(__dirname + "/data/papers/"));

app.get('/sheetlist', function(req, res){
var list = []
fs.readdirSync(__dirname + "/data/papers").forEach(file => {
  list.push(file);
})
res.send(list);
});

app.get('/notebooklist', function(req, res){
var list = []
fs.readdirSync(__dirname + "/data/notebooks").forEach(file => {
  list.push(file);
})
res.send(list);
});

var port = 8080;
http.listen(port, function(){
  console.log('Carbon server started. listening on port ' + port);
});
