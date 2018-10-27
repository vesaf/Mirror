var express = require('express');
var router = express.Router();
var fs = require('fs');

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
