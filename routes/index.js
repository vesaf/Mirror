var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res) {
  res.sendFile('./public/index.html');
});

// Send widget names to app
router.get('/settingnames', function (req, res) {
  fs.readdir("./public/settings", function (err, files) {
    if (err) console.error(err);
    // Don't send widgets in __dev__ folder
    for (var i = 0; i < files.length; i++) {
      if (files[i].slice(-3) == ".js") {
        files[i] = files[i].slice(0, -3);
      }
      else {
        files.splice(i, 1);
      }
    }
    res = setHeaders(res);
    res.end(files.toString());
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
