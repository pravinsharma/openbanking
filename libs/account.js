var audit = require('./audit');
var codec = require('./codec');
const uuidv1 = require('uuid/v1');

var account = {
    record: [
        /*{
            user,        //includes array of { user objects }
            token,
            audit       //includes activity by user
        } */
    ],
    
    // register user
    register = ( user )  => {
        if(!user || !user.username || !user.password)      //mandatory fields check
            return false;
        
        const data_encrypted = codec.encode(user.password);
    
        console.log('encrypted data: ' + data_encrypted);
    
        // search if username exists
        var user_inx = account._search_username( user );
    
        if( user_inx == -1 ) {   // new entry
            var arecord = {
                "user":       user,
                "token":      uuidv1(),
                "audit":      [ audit.get('register') ]
            }
    
            // store user data, synonymous to registering user
            account.record.push( arecord );
        } else {    // entry exists, skip registration
            return false;
        }
    
        return arecord.token;
    },

    // deregister user
    deregister = ( token )  => {
        if(!token)      //mandatory fields check
            return false;
        
        console.log('token: ' + token);

        // search if username exists
        var user_inx = account._search_token( token );

        if( user_inx >= 0 ) {   // entry exists
            // remove from registered users
            account.users.splice( user_inx, 1 );
        } else {    // entry exists, skip registration
            return false;
        }

        return true;
    },

    // find user by username, returns index (-1 means not found)
    _search_username = ( username )  => {
        if(!username)
            return -1;
        
        console.log('search data: ' + username);

        // search user data
        for(var i=0; i<account.record.length; i++) {
            if(username === account.record[i].user.username)
                return i;
        }

        return -1;
    },

    // find user by username, returns index (-1 means not found)
    _search_token = ( token )  => {
        if(!token)
            return -1;
        
        console.log('search data: ' + token);

        // search user data
        for(var i=0; i<account.record.length; i++) {
            if(token === account.record[i].token)
                return i;
        }

        return -1;
    }
}

modules.exports = account;