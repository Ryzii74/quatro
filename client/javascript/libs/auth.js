const Connection = require('../libs/connection');

module.exports = {
    login(data, callback) {
        Connection.send('login', data, callback);
    },

    signup(data, callback) {
        Connection.send('signup', data, callback);
    },

    logout(callback) {
        Connection.send('logout', {}, callback);
    }
};