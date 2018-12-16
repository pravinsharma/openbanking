const transaction_service = require('./service/transactions/transactions')
var express = require('express')
var app = express()


/* ---------VIEW ROUTER--------- */

// all views
app.get('/*', function (req, res) {
    myapp.log(req.url + '...');

    if (req.url == '/apiservice/rewards/transactions') {

        myapp.log('action: get all transactions...');

        
        var transactions = transaction_service.getTransactions();
        //myapp.log('transactions', transactions);
        
        transactions.then(function (documents) {
            var statusCode = 200;

            var payload = JSON.stringify( documents );

            res.writeHead(statusCode);
            res.end( payload );
        });
    } else {
        var statusCode = 404;

        res.writeHead(statusCode);
        res.end();
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