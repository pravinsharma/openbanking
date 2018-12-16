const fs = require('fs');

var transactions = {
    getTransactions = () => {
        var rawdata = fs.readFileSync('./../transaction_db/transactions.json');  
        var transactions = JSON.parse(rawdata);

        return transactions;
    },
    
    // get filtered report with total
    getReport = ( rewardArray, userId )  => {
        if(!rewardArray || rewardArray.length == 0)      //mandatory fields check
            return false;
        
        console.log('rewards data:', rewardArray);
    
        // form records for a user only
        const user_rewards = rewardArray.filter( reward => reward.userid == userId);

        // calculate the total points accrued
        const points_total = user_rewards.map( reward => reward.points ).reduce( (sum, value) => sum + value, 0 );

        // form the report
        const report = {
            user: user_rewards,
            total: points_total
        };
    
        return report;
    }
}

modules.exports = transactions;