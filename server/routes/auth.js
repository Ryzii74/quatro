const async = require('async');
const Db = require('../libs/db');

function getHash(data) {
    return JSON.stringify(data);
}

function auth(socket, user, callback) {
    socket.user = {
        id: user._id.toString(),
        login: user.login,
        friends: user.friends
    };
    socket.join(socket.user.id);
    callback({
        success: true,
        data: {
            login: user.login,
            id: socket.user.id,
            hash: user.hash
        }
    });
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
            callback => {
                const user = {
                    login: data.login,
                    password: data.password,
                    hash,
                    friends: []
                };
                Db.get().collection('users').insertOne(user, (err, result) => {
                    if (err) {
                        console.error('error getting user with login', err);
                        console.error(data);
                        return callback(INTERNAL_ERROR);
                    }
                    user._id = result.insertedId;
                    callback(null, user);
                })
            }
        ], (err, user) => {
            if (err) return callback({
                success: false,
                error: err
            });

            auth(socket, user, callback);
        });

    });
};