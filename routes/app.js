var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require("request");

// Allow app to check if ip works
router.get('/ping', function (req, res) {
  console.log("App connected");
  res = setHeaders(res);
  res.sendStatus(200);
});

// Send widget names to app
router.get('/widgetnames', function (req, res) {
  fs.readdir("./public/widgets", function (err, files) {
    if (err) console.error(err);
    
    // Don't send widgets in __dev__ folder
    if (files.indexOf("__dev__")) {
      files.splice(files.indexOf("__dev__"), 1);
    }
    res = setHeaders(res);
    res.end(files.toString());
  });
});

// Allow app and mirror to set the location of the widget
var widgetLocation;
router.post('/widgetLocation', function (req, res) {
  if (Object.keys(req.body).length === 1) {
    widgetLocation = Object.keys(req.body)[0];
  }
  else {
    widgetLocation = req.body;
  }

  res = setHeaders(res);
  res.end();
});

// Allow app and mirror to get the location of the widget
router.get('/widgetlocation', function (req, res) {
  res = setHeaders(res);
  res.send(widgetLocation).end();
});

// Allow mirror to set the dimensions of the mirror
var dims;
router.post('/screendims', function (req, res) {
  dims = req.body;
  res.end();
});

// Allow app to get the dimensions of the mirror
router.get("/screendims", function (req, res) {
  res = setHeaders(res);
  if (dims) {
    res.send(dims).end();
  }
  else {
    res.sendStatus(400);
  }
});


var status = { id: 0 };

// Send current status
router.get('/status', function (req, res) {
  res = setHeaders(res);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(status);
  status = { id: 0 };
});

// Set current status
var lastWidget;
router.post('/status', function (req, res) {
  var data = JSON.parse(Object.keys(req.body)[0]);
  if (data) {
    console.log(data);
    status = data;
    switch(status.id) {
      // Open widget
      case 1:
        lastWidget = status.options.widget;
        break;
      // Close widget
      case 2:
        lastWidget = undefined;
        break;
      // Started moving widget in app
      case 3:
        break;
      // Stopped moving widget in app
      case 4:
        break
      default:
        console.error("Unknown status");
    }
  }
  res = setHeaders(res);
  res.end();
});

// Send all NBA data to the app
router.get('/nba', function (req, res) {
  // Set day (generally just today but can be set for testing purposes)
  var today = new Date();
  
  // Get season data, new season assumed to start in July
  const season = (today.getMonth() >= 6) ? today.getFullYear() : today.getFullYear() - 1;
  request("http://data.nba.com/prod/v1/" + season + "/schedule.json", function(error, response, body) {
    // Setup relevant schedule object
    var relevantSchedule = {
      yesterday: [],
      today: [],
      tomorrow: []
    };

    // if there are data (i.e. the requested page exists/there is an internet connection)
    if (!error) {
      // Parse data
      const schedule = JSON.parse(body)["league"];
      // Define dates of yesterday, tomorrow and overmorrow
      const dateString = today.toDateString();
      today.setHours(0, 0, 0, 0);
      var yesterday = new Date(dateString);
      yesterday.setHours(0, 0, 0, 0);
      yesterday.setDate(yesterday.getDate() - 1);
      var tomorrow = new Date(dateString);
      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);
      var overmorrow = new Date(dateString);
      overmorrow.setHours(0, 0, 0, 0);
      overmorrow.setDate(overmorrow.getDate() + 2);

      // Get all NBA games in relevant date ranges
      for (let i = 0; i < Object.keys(schedule).length; i++) {
        const category = Object.keys(schedule)[i];
        for (let j = 0; j < schedule[category].length; j++) {
          const game = schedule[category][j];
          let gameTime = Date.parse(game["startTimeUTC"]);
          if (gameTime >= yesterday && gameTime < today){
            relevantSchedule["yesterday"].push(game);
          }
          else if (gameTime >= today && gameTime < tomorrow) {
            relevantSchedule["today"].push(game);
          }
          else if (gameTime >= tomorrow && gameTime < overmorrow) {
            relevantSchedule["tomorrow"].push(game);
          }
        }
      }
    }
    else {
      console.error(error);
    }

    // Send data
    res.write(JSON.stringify(relevantSchedule));
    res.end();
  });
});

// Helper function that sets the res object
function setHeaders(res) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  return res;
}

module.exports = router;
