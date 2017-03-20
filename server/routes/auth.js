const async = require('async');
const User = require('../models/user');

function getHash(data) {
    return JSON.stringify(data);
}

function auth(socket, user, callback) {
    socket.user = user;
    socket.join(socket.user.id);
    callback({
        success: true,
        data: {
            login: user.login,
            id: user.id,
            hash: user.hash
        }
    });
}

module.exports = socket => {
    socket.on('login', (data, callback) => {
        data.hash = data.hash || getHash(data);
        User.findOne({
                hash: data.hash
            })
            .exec((err, user) => {
                if (err) return callback(err);

                if (!user) {
                    return callback({
                        success: false,
                        error: 'Пользователь не найден'
                    });
                }

                auth(socket, user, callback);
            });
    });

    socket.on('logout', (data, callback) => {
        if (socket.user) socket.leave(socket.user.id);
        socket.user = null;
        callback({
            success: true
        });
    });

    socket.on('signup', (data, callback) => {
        const hash = getHash(data);

        async.waterfall([
            callback => User.findOne({
                login: data.login
            }).exec((err, user) => {
                if (user) err = 'пользователь с таким именем уже зарегистрирован';
                callback(err);
            }),
            callback => {
                const user = new User({
                    login: data.login,
                    password: data.password,
                    hash
                });
                user.save(callback);
            }
        ], (err, user) => {
            if (err) {
                console.error(err);
                return callback({
                    success: false,
                    error: err
                });
            }

            auth(socket, user, callback);
        });

    });
};