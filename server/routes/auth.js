const Db = require('../libs/db');

function getHash(data) {
    return JSON.stringify(data);
}

module.exports = socket => {
    socket.on('auth', ({ login }, callback) => {
        socket.login = login;
        callback({
            success: true,
            data: {
                login
            }
        });
    });

    socket.on('login', (data, callback) => {
        Db.get().collection('users').findOne({
            hash: data.hash || getHash(data)
        }, (err, user) => {
            if (err) {
                console.error('error getting user data', err);
                console.error(data);
                return callback({
                    success: false,
                    error: "Внутренняя ошибка"
                });
            }

            if (!user) {
                return callback({
                    success: false,
                    error: "Пользователь не найден"
                });
            }

            socket.id = user._id.toString();
            callback({
                success: true,
                data: {
                    login: user.login
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
        
    });
};