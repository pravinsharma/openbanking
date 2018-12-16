const pug = require('pug');
const qs = require('querystring');
const crypto = require("crypto");
const rewards_report = require('./adapters/mapper/transaction_rewards')
var express = require('express')
var app = express()


/* ---------VIEW ROUTER--------- */

// all views
app.get('/*', function (req, res) {
    myapp.log(req.url + '...');

    if (req.url == '/rewards/report/generate') {

        myapp.log('action: generate report...');
        
        req.on('data', chunk => {
            const data = qs.parse(chunk.toString());
            
            myapp.log('A chunk of data has arrived: ', data);

            
        });
        req.on('end', () => {
            myapp.log('No more data');
        });
    }
});

app.listen(8080);


/* ---------GLOBAL VARS/UTILITIES--------- */

var myapp = {
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