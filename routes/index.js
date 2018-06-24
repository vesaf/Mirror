var express = require('express');
var https = require('https');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.query);
  res.sendFile('./public/index.html');
});

module.exports = router;
