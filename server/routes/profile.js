const async = require('async');
const GameLog = require('../models/gameLogs');
const User = require('../models/user');

module.exports = socket => {
    socket.on('getPlayerProfile', (data, callback) => {
        if (!socket.user) {
            callback({
                success: false,
                error: 'need auth',
            });
            return;
        }

        const userId = data.userId || socket.user.id.toString();
        async.waterfall([
            callback => GameLog.get(userId, data.skip, callback),
            (logs, callback) => User.getOne(userId, { login: 1 }, (err, user) => {
                callback(err, user, logs);
            }),
        ], (err, user, logs) => {
            if (err) {
                console.error(err);
                callback({
                    success: false,
                    error: 'some error',
                });
            }

            const friends = (data.userId || socket.user.id) ? socket.user.friends : [];
            const isInFriends = !!friends
                .find(el => el.userId.toString() === userId.toString());
            callback({
                success: true,
                data: {
                    logs,
                    login: user.login,
                    userId,
                    friends,
                    isInFriends,
                },
            });
        });
    });
};
