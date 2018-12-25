var request = require('request');
var bodyParser = require('body-parser')
const report_service = require('./service/reports/rewards')
var log = require('./utils/log')
var report = require('./service/reports/utils/report')
var express = require('express')
var app = express()


/* ---------VIEW ROUTER--------- */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// all views
app.get('/*', function (req, res) {
    log.info(req.url + '...');

    if (req.url == '/apiservice/rewards/report') {
        log.debug('action: get user reports...');

        const userid = req.body.userid;
        log.debug('userId: ', userid);

        if( !userid ) {
            res.writeHead(200);
            res.end( JSON.stringify({"error": "userid not supplied..."}) );
            res.end();
            log.error('Userid is not supplied...');
        } else {

            /* get transactions */
            request({

                url: report.url.transaction_api,
                json: true
            }, function (error, response, transactions) {
            
                if (!error && response.statusCode === 200) {
                    log.debug('transactions', transactions) // Print the json response

                    /* get reward point mappings */
                    report.transactions = transactions;
                    request({

                        url: report.url.pointsmap_api,
                        json: true
                    }, function (error, response, pointsmap) {
                    
                        if (!error && response.statusCode === 200) {
                            log.debug('pointsmap', pointsmap) // Print the json response
                            
                            report.pointsmap = pointsmap;
                            /* add points(dynamic) to transactions json */
                            report.addPoints2Transactions( [ "c", "b", "cc", "bb", "cb" ] );

                            /* get report for a user */
                            const reportJSON = report_service.getReport( report.transactions, userid );
                            
                            /* send report */
                            var statusCode = 200;
                            var payload = JSON.stringify( reportJSON );
        
                            res.writeHead(statusCode);
                            res.end( payload );
                        } else {
                            res.writeHead(response.statusCode);
                            log.error(error);
                            res.end();
                        }
                    });
                } else {
                    res.writeHead(response.statusCode);
                    log.error(error);
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