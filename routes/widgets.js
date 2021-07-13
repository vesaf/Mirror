var express = require('express');
var router = express.Router();
var fs = require('fs');

// Get toggle status from widget
router.get('/toggle', function (req, res) {

    res = setHeaders(res);
    res.setHeader('Content-Type', 'application/json');

    // TODO: simplify building object
    fs.access("./public/widgets/settings.json", function(err){
        if (err) {
            writePlainWidgetJSON(function(out) {
                res.status(200).send(out);
            });
        }
        else {
            fs.readFile("./public/widgets/settings.json", function(err, data) {
                if (err) {
                    writePlainWidgetJSON(function(out) {
                        res.status(200).send(out);
                    });
                }
                res.status(200).send(JSON.parse(data));
            });
        }
    });
});

router.post('/toggle', function (req, res) {
    const widget = Object.keys(req.body)[0];
    fs.readFile("./public/widgets/settings.json", function(err, data) {
        if (err) {
            console.error(err);
            res.end();
        }
        else {
            settingsObj = JSON.parse(data);
            if (settingsObj[widget] != undefined) {
                settingsObj[widget] = !settingsObj[widget];
            }
            else {
                settingsObj[widget] = false;
            }
            fs.writeFile("./public/widgets/settings.json", JSON.stringify(settingsObj), function(err) {
                if (err) {
                    console.error(err);
                }
                res.end();
            });
        }
    });
    res.end();
});

function writePlainWidgetJSON(callback) {
    getWidgetNames(function(files) {
        var settingsObj = {};
        for (let i = 0; i < files.length; i++) {
            settingsObj[files[i]] = true;
        }
        fs.writeFile("./public/widgets/settings.json", JSON.stringify(settingsObj), function(err) {
            if (err) {
                console.error(err);
                callback({})
            }
            else {
                callback(settingsObj);
            }
        });
    });
}

function getWidgetNames(callback) {
    fs.readdir("./public/widgets", function (err, files) {
        if (err) console.error(err);
        
        // Don't send widgets in __dev__ folder
        if (files.indexOf("__dev__") >= 0) {
            files.splice(files.indexOf("__dev__"), 1);
        }
        // Don't send settings.json file
        if (files.indexOf("settings.json") >= 0) {
            files.splice(files.indexOf("settings.json"), 1);
        }
        callback(files)
    });
}

function checkSettingValidity() {
    // TODO
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