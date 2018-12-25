var log = {

    "switch": {      // add capability switches
        "info":  true,
        "debug": true,
        "error": true
    },

    "info": function() {      // console log capability
        for (var i = 0; i < arguments.length; i++) {
            if( myapp.switch.log ) {
                console.log('\x1b[31m\x1b[36mInfo:\x1b[22m \x1b[93m\x1b[0m' + arguments[i]);
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

    "error": function() {      // console error capability
        for (var i = 0; i < arguments.length; i++) {
            if( myapp.switch.error ) {
                console.log( '\x1b[31m\x1b[1mError:\x1b[22m \x1b[93m' + arguments[i] + '\x1b[0m' )
            }
        }
    }
};

module.exports = log;