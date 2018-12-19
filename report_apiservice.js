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

        if( !userid ) {
            res.writeHead(200);
            res.end( JSON.stringify({"error": "userid not supplied..."}) );
            res.end();
            myapp.error('Userid is not supplied...');
        } else {

            /* get transactions */
            request({

                url: myapp.url.transaction_api,
                json: true
            }, function (error, response, transactions) {
            
                if (!error && response.statusCode === 200) {
                    myapp.log('transactions', transactions) // Print the json response

                    /* get reward point mappings */
                    request({

                        url: myapp.url.pointsmap_api,
                        json: true
                    }, function (error, response, pointsmap) {
                    
                        if (!error && response.statusCode === 200) {
                            myapp.log('pointsmap', pointsmap) // Print the json response
        
                            const report = report_service.getReport( pointsmap, userid );
        
                            var statusCode = 200;
                            var payload = JSON.stringify( report );
        
                            res.writeHead(statusCode);
                            res.end( payload );
                        } else {
                            res.writeHead(response.statusCode);
                            myapp.error(error);
                            res.end();
                        }
                    });
                } else {
                    res.writeHead(response.statusCode);
                    myapp.error(error);
                    res.end();
                }
            });
        }
    } else {
        res.writeHead(404);
        res.end();
    }
});

app.listen(8080);


/* ---------GLOBAL VARS/UTILITIES--------- */

var myapp = {
    "url": {
        "transaction_api": "http://localhost:8081/apiservice/rewards/transactions",
        "pointsmap_api": "http://localhost:8082/apiservice/rewards/pointsmap"
    },

    "switch": {      // add capability switches
        "log":  true,
        "debug": true,
        "error": true
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
    },

    "error": function() {      // console debug capability
        for (var i = 0; i < arguments.length; i++) {
            if( myapp.switch.debug ) {
                console.error.bind(console, arguments[i]);
            }
        }
    }
};