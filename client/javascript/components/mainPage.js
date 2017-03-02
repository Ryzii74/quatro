const Connection = require('../libs/connection');

module.exports = {
    template: '<h1>Привет</h1>',
    created() {
        Connection.send("getGameOffers", {}, (err, data) => {
            console.log(data);
        });
    }
};