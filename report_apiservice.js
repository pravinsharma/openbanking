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
                    myapp.transactions = transactions;
                    request({

                        url: myapp.url.pointsmap_api,
                        json: true
                    }, function (error, response, pointsmap) {
                    
                        if (!error && response.statusCode === 200) {
                            myapp.log('pointsmap', pointsmap) // Print the json response
                            
                            myapp.pointsmap = pointsmap;
                            /* add points(dynamic) to transactions json */
                            myapp.addPoints2Transactions( [ "c", "b", "cc", "bb", "cb" ] );

                            /* get report for a user */
                            const report = report_service.getReport( myapp.transactions, userid );
                            
                            /* send report */
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
    pointsmap: null,
    transactions: null,

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
    },

    "addPoints2Transactions": function(types) {
        var pmap = null;
        var trans = null;
        var type = null;

        for (let t = 0; t < types.length; t++) {
            type = types[t];

            console.log('type', type);
            pmap = myapp.pointsmap.filter( pmap => pmap.t == type);
            if( pmap ) {
                console.log('pmap', pmap);
                trans = myapp.transactions.filter( trans => trans.t == type);
                console.log('trans', trans);
                for (let i = 0; i < pmap.length; i++) {
                    
                    for (let j = 0; j < trans.length; j++) {
        
                        if( pmap[i].d && pmap[i].d.length > 0 ) {
                            console.log('pmap[i].d', pmap[i].d, 'trans[j].d', trans[j].d, 'trans[j].points', trans[j].points);
                            if( pmap[i].d.indexOf( trans[j].d ) == -1 ) continue;
                        }
                        if( pmap[i].s && pmap[i].s.length > 0 ) {
                            if( pmap[i].s.indexOf( trans[j].s ) == -1 ) continue;
                        }
                        if( trans[j].points ) continue;
        
                        trans[j].points = pmap[i].base * myapp._getMultiplier(pmap[i].slab, trans[j].a);
                        console.log('trans[j]', trans[j]);
                    }
                }
            }
        }
    },
    
    "_getMultiplier": function(slab, amount) {
        var multiplier = 1;
    
        if (slab && slab.length > 0) {
            for (let k = 0; k < slab.length; k++) {
                var l = slab[k].l;
                var h = slab[k].h;
                if( amount >= l && amount <= h ) {
                    multiplier = slab[k].m;
                    break;
                }
            }
        }
    
        return multiplier;
    }
};