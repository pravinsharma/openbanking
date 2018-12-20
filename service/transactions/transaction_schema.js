var mongoose = require('../db_utils/mongo_connection');
var Schema = mongoose.Schema;

// define a schema
var transactionSchema = new Schema({
    _id: Number,
    t: String,
    s: String,
    d: String,
    timestamp: String,
    a: Number,
    userid: Number
}, { collection : 'transaction' });

module.exports = mongoose.model('transaction', transactionSchema);