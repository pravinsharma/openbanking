const pointsmap_service = require('./service/pointsmap/pointsmap')
var log = require('./utils/log')
var express = require('express')
var app = express()

/* ---------VIEW ROUTER--------- */

// all views
app.get('/*', function (req, res) {
    log.info(req.url + '...');

    if (req.url == '/apiservice/rewards/pointsmap') {
        log.debug('action: get all mapping for the points...');
        
        var pointsmap = pointsmap_service.getMaps();
        
        pointsmap.then(function (documents) {
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

app.listen(8082);