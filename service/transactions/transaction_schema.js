var mongoose = require('./mongo_connection');
var Schema = mongoose.Schema;

// define a schema
var transactionSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    points: {type: Number},
    operation: {type: String},
    info: {type: String},
    timestamp: {type: String},
    userid: {type: Number},
    transactionid: {type: Number}
}, { collection : 'transaction' });

module.exports = mongoose.model('transaction', transactionSchema); 