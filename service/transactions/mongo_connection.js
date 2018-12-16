// connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:32768/openbanking', { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error : '));
db.once('open', function(){
  console.log('Connection good...');
});

module.exports = mongoose;