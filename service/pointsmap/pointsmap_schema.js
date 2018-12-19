var mongoose = require('../db_utils/mongo_connection');
var Schema = mongoose.Schema;

// define a schema
var pointsmapSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    base: Number,
    slab: [{
        l: Number,
        h: Number,
        m: Number
    }]
}, { collection : 'pointsmap' });

module.exports = mongoose.model('pointsmap', pointsmapSchema); 