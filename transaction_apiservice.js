const transaction_service = require('./service/transactions/transactions')
var log = require('./utils/log')
var express = require('express')
var app = express()

/* ---------VIEW ROUTER--------- */

// all views
app.get('/*', function (req, res) {
    log.info(req.url + '...');

    if (req.url == '/apiservice/rewards/transactions') {
        log.debug('action: get all transactions...');
        
        var transactions = transaction_service.getTransactions();
        
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

app.listen(8081);