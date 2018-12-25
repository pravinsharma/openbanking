var log = require('./utils/log')

var report = {
    pointsmap: null,
    transactions: null,

    "url": {
        "transaction_api": "http://localhost:8081/apiservice/rewards/transactions",
        "pointsmap_api": "http://localhost:8082/apiservice/rewards/pointsmap"
    },

    "addPoints2Transactions": function(types) {
        var pmap = null;
        var trans = null;
        var type = null;

        for (let t = 0; t < types.length; t++) {
            type = types[t];

            log.debug('type', type);
            pmap = myapp.pointsmap.filter( pmap => pmap.t == type);
            if( pmap ) {
                log.debug('pmap', pmap);
                trans = myapp.transactions.filter( trans => trans.t == type);
                log.debug('trans', trans);
                for (let i = 0; i < pmap.length; i++) {
                    
                    for (let j = 0; j < trans.length; j++) {
        
                        if( pmap[i].d && pmap[i].d.length > 0 ) {
                            log.debug('pmap[i].d', pmap[i].d, 'trans[j].d', trans[j].d, 'trans[j].points', trans[j].points);
                            if( pmap[i].d.indexOf( trans[j].d ) == -1 ) continue;
                        }
                        if( pmap[i].s && pmap[i].s.length > 0 ) {
                            if( pmap[i].s.indexOf( trans[j].s ) == -1 ) continue;
                        }
                        if( trans[j].points ) continue;
        
                        trans[j].points = pmap[i].base * myapp._getMultiplier(pmap[i].slab, trans[j].a);
                        log.debug('trans[j]', trans[j]);
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

module.exports = report;