var express = require('express');
var https = require('https');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('https://accounts.spotify.com/en/authorize?client_id=c933d6e92605451aa4347afcf5e05c3c&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000&scope=user-read-private%20user-read-email&state=34fFs29kd09');
});

router.get('/authorized', function(req, res){
  console.log(req.query);
  res.sendFile('./public/index.html');
});
module.exports = router;
