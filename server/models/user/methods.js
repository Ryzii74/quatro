const Schema = require('./schema');

Schema.methods.isSubscribed = function isSubscribed () {
    let now = new Date();
    let plan = this.purchased.plan;

    return plan && plan.customerId && (!plan.dateTerminated || moment(plan.dateTerminated).isAfter(now));
};