
var pointsmap = [
    {
        "_id":  1,
        "t": "c",
        "s": ["lloyds", "halifax"],
        "base": 100
    },
    {
        "_id":  2,
        "t": "c",
        "s": ["hsbc"],
        "base": 10
    },
    {
        "_id":  3,
        "t": "cc",
        "d": ["lloyds", "halifax"],
        "base": 150,
        "slab": [
            {
                "l": 10000,
                "h": 50000,
                "m": 1.5
            },
            {
                "l": 50001,
                "h": 100000,
                "m": 3
            },
            {
                "l": 100001,
                "m": 4
            }
        ]
    },
    {
        "_id":  4,
        "t": "cc",
        "d": ["hsbc"],
        "base": 50,
        "slab": [
            {
                "l": 10000,
                "h": 50000,
                "m": 1.5
            },
            {
                "l": 50001,
                "h": 100000,
                "m": 3
            },
            {
                "l": 100001,
                "m": 4
            }
        ]
    },
    {
        "_id":  5,
        "t": "b",
        "s": ["lloyds", "halifax"],
        "base": 150,
        "slab": [
            {
                "l": 10000,
                "h": 50000,
                "m": 1.5
            },
            {
                "l": 50001,
                "h": 100000,
                "m": 3
            },
            {
                "l": 100001,
                "m": 4
            }
        ]
    },
    {
        "_id":  6,
        "t": "cc",
        "base": 2
    },
    {
        "_id":  7,
        "t": "cb",
        "d": ["lloyds", "halifax"],
        "base": 50
    },
    {
        "_id":  7,
        "t": "bb",
        "base": 10
    }
];

var transactions = [
    {
        "_id":  100,
        "t": "cb",
        "s": "halifax",
        "d": "lloyds",
        "timestamp": "10/12/2018 12:42:00",
        "a": 1500,
        "userid": 1011
    },
    {
        "_id":  101,
        "t": "cb",
        "s": "icici",
        "d": "lloyds",
        "timestamp": "10/09/2018 22:02:00",
        "a": 2800,
        "userid": 1001
    },
    {
        "_id":  102,
        "t": "cc",
        "s": "hsbc",
        "d": "lloyds",
        "timestamp": "21/09/2018 02:02:00",
        "a": 5500,
        "userid": 1001
    },
    {
        "_id":  103,
        "t": "bb",
        "s": "hdfc",
        "d": "halifax",
        "timestamp": "10/01/2016 22:02:00",
        "a": 10000,
        "userid": 1101
    },
    {
        "_id":  104,
        "t": "cc",
        "s": "halifax",
        "d": "hsbc",
        "timestamp": "10/02/2018 16:02:00",
        "a": 50001,
        "userid": 1001
    },
    {
        "_id":  105,
        "t": "c",
        "s": "lloyds",
        "timestamp": "17/02/2018 14:02:00",
        "userid": 1001
    },
    {
        "_id":  106,
        "t": "b",
        "s": "lloyds",
        "timestamp": "17/02/2018 14:02:00",
        "a": 4000,
        "userid": 1001
    }
];

var map_func = function() {
    // credit card open
    modifyTransaction( "c" );

    // bank account open
    modifyTransaction( "b" );

    // bank to bank transfer
    modifyTransaction( "bb" );

    // credit card to bank account
    modifyTransaction( "cb" );

    // credit card to credit card - transfer amount in easy emi payment
    modifyTransaction( "cc" );
    
    console.log(transactions);
}();

function modifyTransaction(type) {
    var pmap = pointsmap.filter( pmap => pmap.t == type);
    if( pmap ) {
        console.log('pmap', pmap);
        var trans = transactions.filter( trans => trans.t == type);
        console.log('trans', trans);
        for (let i = 0; i < pmap.length; i++) {
            
            for (let j = 0; j < trans.length; j++) {

                if( pmap[i].d ) {console.log('pmap[i].d', pmap[i].d, 'trans[j].d', trans[j].d, 'trans[j].points', trans[j].points);
                    if( pmap[i].d.indexOf( trans[j].d ) == -1 ) continue;
                }
                if( pmap[i].s ) {
                    if( pmap[i].s.indexOf( trans[j].s ) == -1 ) continue;
                }
                if( trans[j].points ) continue;

                trans[j].points = pmap[i].base * getMultiplier(pmap[i].slab, trans[j].a);
            }
        }
    }
}

function getMultiplier(slab, amount) {
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