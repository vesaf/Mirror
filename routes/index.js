var express = require('express');
var https = require('https');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  console.log(req.query);
  res.sendFile('./public/index.html');
});

router.get('/ping', function (req, res) {
  console.log(req._remoteAddress);
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.sendStatus(200);
})

module.exports = router;
