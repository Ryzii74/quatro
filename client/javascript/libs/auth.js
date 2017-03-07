const Connection = require('./connection');
const Session = require('./session');

module.exports = {
    login(data, callback) {
        Connection.send('login', data, (err, user) => {
            if (user && user.hash) Session.saveSession(user.hash);
            callback(err, user);
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