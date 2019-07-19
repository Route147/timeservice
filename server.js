// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// GET [project_url]/api/timestamp/:date_string?
app.get('/api/timestamp/:date_string?', function(request, response, next){
  let time = new Date();
  if(request.params.date_string !== '') {
    time = new Date(request.params.date_string);
  }
  request.time = time.toUTCString();
//  request.unix = Math.floor(time / 1000);
  request.unix = time.getTime();
  next();
}, function(request, response){
  response.json({"unix": request.unix, "utc": request.time});  
//  response.json({"echo": request.params.date_string});  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});