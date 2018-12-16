var request = require('request');
var bodyParser = require('body-parser')
const report_service = require('./service/reports/rewards')
var express = require('express')
var app = express()


/* ---------VIEW ROUTER--------- */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// all views
app.get('/*', function (req, res) {
    myapp.log(req.url + '...');

    if (req.url == '/apiservice/rewards/report') {
        myapp.log('action: get user reports...');

        const userid = req.body.userid;
        myapp.log('userId: ', userid);

        request({

            url: myapp.url,
            json: true
        }, function (error, response, transactions) {
        
            if (!error && response.statusCode === 200) {
                myapp.log('transactions', transactions) // Print the json response

                const report = report_service.getReport( transactions, userid );

                var statusCode = 200;
                var payload = JSON.stringify( report );

                res.writeHead(statusCode);
                res.end( payload );
            }
        });
    } else {
        var statusCode = 404;

        res.writeHead(statusCode);
        res.end();
    }
});

app.listen(8081);


/* ---------GLOBAL VARS/UTILITIES--------- */

var myapp = {
    "url": "http://localhost:8080/apiservice/rewards/transactions",

    "switch": {      // add capability switches
        "log":  true,
        "debug": true
    },

    "log": function() {      // console log capability
        for (var i = 0; i < arguments.length; i++) {
            if( myapp.switch.log ) {
                console.log(arguments[i]);
            }
        }
    },

    "debug": function() {      // console debug capability
        for (var i = 0; i < arguments.length; i++) {
            if( myapp.switch.debug ) {
                console.debug(arguments[i]);
            }
        }
    }
};