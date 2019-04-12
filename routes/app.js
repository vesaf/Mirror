var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require("request");

router.get('/ping', function (req, res) {
  res = setHeaders(res);
  res.sendStatus(200);
});

router.get('/widgetnames', function (req, res) {
  fs.readdir("./public/widgets", function (err, files) {
    if (err) console.error(err);
    res = setHeaders(res);
    res.end(files.toString());
  });
});

var widgetLocation;
router.post('/widgetLocation', function (req, res) {
  widgetLocation = req.body;
  res.end();
});

router.get('/widgetlocation', function (req, res) {
  res = setHeaders(res);
  res.send(widgetLocation).end();
});

var dims;
router.post('/screendims', function (req, res) {
  dims = req.body;
  res.end();
});

router.get("/screendims", function (req, res) {
  console.log(dims);
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
    if (status.id === 1) {
      lastWidget = status.options.widget;
    }
    else if (status.id === 2) {
      lastWidget = undefined;
    }
  }
  res = setHeaders(res);
  // console.log(res);
  res.end();
});

// router.get("/screendims", function (req, res) {
//   console.log(dims);
//   res = setHeaders(res);
//   if (dims) {
//     res.send(dims).end();
//   }
//   else {
//     res.sendStatus(400);
//   }
// });

router.get('/nba', function (req, res) {
  request("http://data.nba.com/prod/v1/2018/schedule.json", function(error, response, body) {
    const schedule = JSON.parse(body)["league"];
    var today = new Date("01/01/2019");
    today.setHours(0, 0, 0, 0);
    var yesterday = new Date("01/01/2019");
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);
    var tomorrow = new Date("01/01/2019");
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    var overmorrow = new Date("01/01/2019");
    overmorrow.setHours(0, 0, 0, 0);
    overmorrow.setDate(overmorrow.getDate() + 2);
    console.log(today);
    console.log(yesterday);
    console.log(tomorrow);
    console.log(overmorrow);

    var relevantSchedule = {
      yesterday: [],
      today: [],
      tomorrow: []
    };
    for (let i = 0; i < schedule["standard"].length; i++) {
      const game = schedule["standard"][i];
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
    res.write(JSON.stringify(relevantSchedule));
    res.end();
  });
});

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
