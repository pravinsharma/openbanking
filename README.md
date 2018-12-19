# openbanking

## create database
```
use openbanking
```

## drop database
```
use openbanking
db.dropDatabase()
```

## list all databases
```
show dbs
```

## list all collections for current database
```
show collections 	
```

## list users for current database
```
show users
```

## list all roles, both user-defined and built-in, for the current database
```
show roles
```

## drop collection
```
db.transaction.drop()
```

## insert into schema
```
db.transaction.insertMany([
    {
        "_id":  100,
        "points": 1,
        "operation": "daily usage",
        "info": "",
        "timestamp": "10/12/2018 12:42:00",
        "userid": 1011,
        "transactionid": 23456
    },
    {
        "_id":  101,
        "points": 10,
        "operation": "transaction",
        "info": "bank:hsbc - cc:icici",
        "timestamp": "10/09/2018 22:02:00",
        "userid": 1001,
        "transactionid": 11456
    },
    {
        "_id":  102,
        "points": 30,
        "operation": "transaction",
        "info": "bank:lloyds - cc:icici",
        "timestamp": "21/09/2018 02:02:00",
        "userid": 1001,
        "transactionid": 3461
    },
    {
        "_id":  103,
        "points": 100,
        "operation": "transfer",
        "info": "transfered cc:icici - cc:lloyds",
        "timestamp": "10/01/2016 22:02:00",
        "userid": 1101,
        "transactionid": 346212
    },
    {
        "_id":  104,
        "points": 300,
        "operation": "recommendation",
        "info": "account open bank:lloyds",
        "timestamp": "10/02/2018 16:02:00",
        "userid": 1001,
        "transactionid": 246212
    },
    {
        "_id":  105,
        "points": 50,
        "operation": "megaday",
        "info": "bank:hdfc - cc:icici",
        "timestamp": "17/02/2018 14:02:00",
        "userid": 1001,
        "transactionid": 2461212
    }
])

db.pointsmap.insertMany([
    {
        "_id":  1,
        "type": "cc_lloyds",
        "base": 100,
        "slab": [
            {
                "l":  100000,
                "h": 1500000,
                "m": 1
            },
            {
                "l": 1500001,
                "h": 10000000,
                "m": 1.5
            },
            {
                "l": 10000001,
                "m": 3
            }
        ]
    },
    {
        "_id":  2,
        "type": "cc_hsbc",
        "base": 50,
        "slab": [
            {
                "l":  100000,
                "h": 1500000,
                "m": 1
            },
            {
                "l": 1500001,
                "h": 10000000,
                "m": 1.5
            },
            {
                "l": 10000001,
                "m": 3
            }
        ]
    },
    {
        "_id":  3,
        "type": "cc_oth",
        "base": 1
    },
    {
        "_id":  4,
        "type": "cb_oth",
        "base": 10
    },
    {
        "_id":  5,
        "type": "cb_lloyds",
        "base": 100,
        "slab": [
            {
                "l": 1500001,
                "h": 10000000,
                "m": 1
            },
            {
                "l": 10000001,
                "m": 2
            }
        ]
    },
    {
        "_id":  6,
        "type": "c_lloyds",
        "base": 200
    }
])
```

## list from collection
```
db.transaction.find().pretty()
```

## update the collection
```
db.transaction.update({'_id': 104},{$set:{'points': 250}})
```