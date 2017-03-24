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
        GameLog.get(userId, data.skip, (err, logs) => {
            if (err) {
                console.error('error getting logs', err);
                callback({
                    success: false,
                    error: 'error getting logs',
                });
                return;
            }

            User.getOne(userId, { login: 1 }, (err, user) => {
                if (err) {
                    console.error('error getting user', err);
                    callback({
                        success: false,
                        error: 'error getting user',
                    });
                    return;
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
    });
};
