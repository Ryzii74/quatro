const Connection = require('./connection');
const Session = require('./session');
const Store = require('../stores/index');

module.exports = {
    login(data, callback) {
        Connection.send('login', data, (err, user) => {
            if (err) return;

            if (user && user.hash) Session.saveSession(user.hash);

            if (user.game) {
                Store.commit('setCurrentGame', user.game);
                delete user.game;
            }

            Store.commit('login', user);

            if (callback) callback(err, user);
        });
    },

    signup(data, callback) {
        Connection.send('signup', data, (err, user) => {
            if (err) return;

            Store.commit('login', user);
            if (callback) callback(err, user);
        });
    },

    logout(callback) {
        Connection.send('logout', {}, (err, data) => {
            if (!err) Session.removeSession();
            callback(err, data);
        });
    }
};