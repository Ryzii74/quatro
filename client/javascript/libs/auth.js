const Connection = require('./connection');
const Session = require('./session');

module.exports = {
    login(data, callback) {
        Connection.send('login', data, (err, data) => {
            if (data && data.hash) Session.saveSession(data.hash);
            callback(err, data);
        });
    },

    signup(data, callback) {
        Connection.send('signup', data, callback);
    },

    logout(callback) {
        Connection.send('logout', {}, (err, data) => {
            if (!err) Session.removeSession();
            callback(err, data);
        });
    }
};