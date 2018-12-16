var transactionModel = require('./transaction_db/transaction_schema');

var transactions = {
    getTransactions: () => {

        return transactionModel.find({}).exec()
        .then(function(project){
            return project;
        });
    }
}

module.exports = transactions;