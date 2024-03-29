var express = require('express');
var router = express.Router();
var fs = require('fs');
var exec = require('child_process').exec;
// var wifi = require('wifi-control');

// wifi.init({
//   debug: true
// });

/* GET home page. */
router.get('/', function (req, res) {
  res.sendFile('./public/index.html');
});

/* GET home page. */
router.get('/app', function (req, res) {
  res.sendFile('../public/index.html', {root: __dirname});
});

// Send widget names to app
router.get('/settingnames', function (req, res) {
  fs.readdir("./public/settings", function (err, files) {
    if (err) console.error(err);
    files = getSettingJS(files);
    for (let i = 0; i < files.length; i++) {
      files[i] = files[i].slice(0, -3);
    }
    res = setHeaders(res);
    res.end(files.toString());
  });
});

// Get names of all js files in list without extension
function getSettingJS(files) {
  for (var i = 0; i < files.length; i++) {
    if (files[i].slice(-3) != ".js") {
      files.splice(i, 1);
      getSettingJS(files);
    }
  }
  return files;
}

// Get list of wifi networks
// TODO: force refresh wifi
router.get('/wifinetworks', function (req, res) {
  res = setHeaders(res);
  // Check if on Windows
  if (process.platform == "win32") {
    getNetworksWin(function(connections) {
      res.end(JSON.stringify(connections))
    });
  }
  else if (process.platform == "linux") {
    getNetworksLin(function(connections) {
      res.end(JSON.stringify(connections));
    });
  }
});

// Convert percentage quality to dBm
function percTodBm(quality) {
  const max = -30;
  const min = -90;
  return (max - min) * (quality/100) + min;
  // Alternative quality to dBm conversion
  // var dBm = (quality / 2) - 100;
}

function dBmToSignal(dBm) {
  // Convert dBm to number of visible wifi bars
  dBm = parseInt(dBm);
  if (dBm >= -50) {
    return 3;
  }
  else if (dBm >= -60) {
    return 2;
  }
  else if (dBm >= -70) {
    return 1;
  }
  else {
    return 0;
  }
}

function getNetworksWin(callback) {
  // Request wifi networks
  exec("netsh wlan show networks mode=Bssid", (error, stdout, stderr) => {
    // Check and handle error
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    // define regex to find signal quality
    var signalReg = /Signal \s*: (\d+)%/;
    var authReg = /Authentication \s*: (.+)\r/;

    // define regex to find number of available networks and test
    var wifiCountReg = /There are (\d+) networks currently visible/;

    var wifiCountRegOut = wifiCountReg.exec(stdout);
    var connections = [];

    // If no issue counting networks, continue
    if (wifiCountRegOut !== null) {
      var wifiCount = parseInt(wifiCountRegOut[1]);

      // Loop through networks
      for (let i = 0; i < wifiCount; i++) {
        // Get SSID and all text for current network
        var SSIDReg = new RegExp("SSID " + (i+1) + " : (.*)\\r[\\s\\S]*?\\r\\n\\r\\n");
        var SSIDRegOut = SSIDReg.exec(stdout);

        // If no issue, continue
        if (SSIDRegOut !== null) {
          // Get SSID from regex result
          var SSID = SSIDRegOut[1];
          // Run signal quality regex on network information text saved in total SSID regex match
          var signalRegOut = signalReg.exec(SSIDRegOut[0]);

          // If quality defined available get it and convert to signal strength
          var quality = undefined;
          var signal = undefined;
          if (signalRegOut !== null) {
            quality = parseInt(signalRegOut[1]);
            // Convert percentage quality to dBm
            var dBm = percTodBm(quality);
            var signal = dBmToSignal(dBm);
          }

          var authRegOut = authReg.exec(SSIDRegOut[0]);
          var auth = undefined;
          if (authRegOut !== null) {
            auth = authRegOut[1];
          }
          // Add results to list of networks
          connections.push({SSID: SSID, signal: signal, quality: quality, dBm: dBm, auth: auth})
        }
        else {
          break;
        }
      }
    }
    callback(connections);
  });
}

function getNetworksLin(callback) {
  exec("sudo iwlist wlan0 scan", (err, stdout, stderr) => {
  // fs.readFile("wifi2.txt", "utf8", function(err, stdout) {
    if (err) throw err;
    var signalReg = /Signal level=(-?\d{1,2})/g;
    // Get SSID and all text for current network
    var SSIDReg = /ESSID:"(.*)"/g;
    // var SSIDRegOut = data.matchAll(SSIDReg);
    var connections = [];

    // Set SSID
    var regExOut;
    while ((regExOut = SSIDReg.exec(stdout)) !== null) {
      connections.push({SSID: regExOut[1]});
    }

    // set signal
    var i = 0;
    while ((regExOut = signalReg.exec(stdout)) !== null) {
      connections[i].dBm = regExOut[1];
      connections[i].signal = dBmToSignal(regExOut[1]);
      i++;
    }

    // Set authentication method
    var dataCpy = stdout;
    var start;
    i = 0;
    while ((start = dataCpy.indexOf("Cell ")) >= 0) {
      start += "Cell ".length;
      dataCpy = dataCpy.substring(start);
      let end = dataCpy.indexOf("Cell ");
      if (end < 0) {
        end = stdout.length;
      }
      let connection = dataCpy.substring(0, end);
      if (connection.indexOf("WPA2") >= 0) {
        connections[i].auth = "WPA2";
      }
      else if (connection.indexOf("WPA") >= 0) {
        connections[i].auth = "WPA";
      }
      else if (connection.indexOf("WEP") >= 0) {
        connections[i].auth = "WEP";
      }
      else {
        connections[i].auth = "Open";
      }
      i++;
    }
    callback(connections);
  });
}

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
