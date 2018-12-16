const crypto = require('crypto');

var codec = {
    // helper internal function
    encode = ( data )  => {
        const data_encrypted = crypto.createHmac('sha256', 'some secret').update(data).digest('hex');

        console.log('encrypted str: ' + data_encrypted);
        return data_encrypted;
    }
};

module.exports = codec;