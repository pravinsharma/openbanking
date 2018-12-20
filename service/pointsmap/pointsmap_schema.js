var mongoose = require('../db_utils/mongo_connection');
var Schema = mongoose.Schema;

// define a schema
var pointsmapSchema = new Schema({
    _id: Number,
    t: String,
    s: [String],
    d: [String],
    base: Number,
    slab: [{
        l: Number,
        h: Number,
        m: Number
    }]
}, { collection : 'pointsmap' });

module.exports = mongoose.model('pointsmap', pointsmapSchema);