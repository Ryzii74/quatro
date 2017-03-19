const GameLogs = require('../libs/gameLogs');
const User = require('../models/user');

module.exports = socket => {
    socket.on('getPlayerProfile', (data, callback) => {
        if (!socket.user) return callback({
            success: false,
            error: 'need auth'
        });

        const userId = data.userId || socket.user.id.toString();
        GameLogs.get(userId, data.skip, (err, logs) => {
            if (err) {
                console.error("error getting logs", err);
                callback({
                    success: false,
                    error: "error getting logs"
                });
                return;
            }
            
            User.getOne(userId, { login: 1 }, (err, user) => {
                if (err) {
                    console.error("error getting user", err);
                    callback({
                        success: false,
                        error: "error getting user"
                    });
                    return;
                }

                callback({
                    success: true,
                    data: {
                        logs,
                        login: user.login,
                        userId,
                        friends: (data.userId || socket.user.id) ? socket.user.friends : [],
                        isInFriends: !!socket.user.friends.find(el => el.userId.toString() === userId.toString())
                    }
                });
            });
        });
    });
};