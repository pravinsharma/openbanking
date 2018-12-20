var rewards = {
    
    // get filtered report with total
    getReport: ( transactions, userId )  => {
        if( !transactions || transactions.length == 0 )      //mandatory fields check
            return false;
        
        console.log('getReport... data:', transactions, 'userId:', userId);
    
        // form records for a user only
        const user_rewards = transactions.filter( reward => reward.userid == userId).map( reward => ({
            points: reward.points,
            transid: reward._id
        }));

        // calculate the total points accrued
        const points_total = user_rewards.map( reward => reward.points ).reduce( (sum, value) => sum + value, 0 );

        // form the report
        const report = {
            user: userId,
            user_records: user_rewards,
            total: points_total
        };
    
        return report;
    }
}

module.exports = rewards;