const async = require('async');
const Db = require('../libs/db');

function getHash(data) {
    return JSON.stringify(data);
}

const INTERNAL_ERROR = 'внутренняя ошибка';

module.exports = socket => {
    socket.on('login', (data, callback) => {
        data.hash = data.hash || getHash(data);
        Db.get().collection('users').findOne({
            hash: data.hash
        }, (err, user) => {
            if (err) {
                console.error('error getting user data', err);
                console.error(data);
                return callback({
                    success: false,
                    error: INTERNAL_ERROR
                });
            }

            if (!user) {
                return callback({
                    success: false,
                    error: 'Пользователь не найден'
                });
            }

            socket.user = {
                id: user._id.toString(),
                login: user.login
            };
            callback({
                success: true,
                data: {
                    login: user.login,
                    hash: data.hash
                }
            });
        });
    });

    socket.on('logout', (data, callback) => {
        socket.login = null;
        callback({
            success: true,
            data: {
                login: null
            }
        });
    });

    socket.on('signup', (data, callback) => {
        const hash = getHash(data);

        async.waterfall([
            callback => Db.get().collection('users').findOne({
                login: data.login
            }, (err, user) => {
                if (err) {
                    console.error('error getting user with login', err);
                    console.error(data);
                    return callback(INTERNAL_ERROR);
                }
                if (user) return callback('пользователь с таким именем уже зарегистрирован');

                callback();
            }),
            callback => Db.get().collection('users').insertOne({
                login: data.login,
                password: data.password,
                hash
            }, (err, result) => {
                if (err) {
                    console.error('error getting user with login', err);
                    console.error(data);
                    return callback(INTERNAL_ERROR);
                }

                callback(null, result.insertedId);
            })
        ], (err, userId) => {
            if (err) return callback({
                success: false,
                error: err
            });

            socket.user = {
                id: userId.toString(),
                login: data.login
            };
            callback({
                success: true,
                data: {
                    login: data.login,
                    hash
                }
            })
        });

    });
};