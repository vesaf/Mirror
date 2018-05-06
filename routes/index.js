var express = require('express');
var https = require('https');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.query);
  res.sendFile('./public/index.html');
});

router.get('/spotify', function(req, res) {
  https.get('https://accounts.spotify.com/en/authorize?client_id=c933d6e92605451aa4347afcf5e05c3c&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email&state=34fFs29kd09', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.send(data);
    });
  }).on('error', (err) => {
    console.log("Error: " + err.message);
  });
  // res.send('hello');
});

module.exports = router;
