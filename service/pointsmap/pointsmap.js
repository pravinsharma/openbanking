var pointsmapModel = require('./pointsmap_schema');

var pointsmap = {
    getMaps: () => {

        return pointsmapModel.find({})
            .exec()
            .then(function(document){
                return document;
            });
    }
}

module.exports = pointsmap;