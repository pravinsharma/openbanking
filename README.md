# openbanking

## Docker
> get latest from docker repo

`docker pull mongo:latest`

> it - interactive mode, d - detached

`docker run -it -d mongo`

> list all running processes

`docker ps`

> container must be stopped before removing it

`docker stop my_container`

> container can be started if it exists

`docker start my_container`

> container can be removed

`docker rm my_container`

> p - port mapping, d - daemon, name - name the conatiner

`docker run --name mongo -d -p 27017:27017 mongo:latest`

> execute interactive terminal for mongo container

`docker exec -it mongo /bin/bash`


## Mongo
### create database
```
use openbanking
```

### drop database
```
use openbanking
db.dropDatabase()
```

### list all databases
```
show dbs
```

### list all collections for current database
```
show collections 	
```

### list users for current database
```
show users
```

### list all roles, both user-defined and built-in, for the current database
```
show roles
```

### drop collection
```
db.transaction.drop()
```

### insert into schema
```
db.transaction.insertMany([
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
        "a": 12700,
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
])

db.pointsmap.insertMany([
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
        "_id":  8,
        "t": "bb",
        "base": 10
    }
])
```

### list from collection
```
db.transaction.find().pretty()
```

### update the collection
```
db.transaction.update({'_id': 104},{$set:{'points': 250}})
```