var mongoose = require('../db_utils/mongo_connection');
var Schema = mongoose.Schema;

// define a schema
var transactionSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    points: Number,
    operation: String,
    info: String,
    timestamp: String,
    userid: Number,
    transactionid: Number
}, { collection : 'transaction' });

module.exports = mongoose.model('transaction', transactionSchema); 