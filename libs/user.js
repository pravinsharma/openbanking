
var account = require('./account');

var user = {
    name:       '',
    address:    '',
    email:      '',
    password:   ''
}

user.prototype.add = ( user ) => {
    if( !user || !user.name || !user.password ) {
        return false;
    }

    account.register( user );
}

user.prototype.delete = ( user ) => {
    if( !user || !user.name || !user.password ) {
        return false;
    }

    account.register( user );
}