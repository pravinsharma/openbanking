var transactionModel = require('./transaction_schema');

var transactions = {
    getTransactions: () => {

        return transactionModel.find({})
            .exec()
            .then(function(document){
                return document;
            });
    }
}

module.exports = transactions;