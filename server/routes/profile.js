const GameLogs = require('../libs/gameLogs');

module.exports = socket => {
    socket.on('getPlayerProfile', (data, callback) => {
        if (!socket.user) return callback({
            success: false,
            error: 'need auth'
        });

        const userId = data.userId || socket.user.id;
        GameLogs.get(userId, data.skip, (err, logs) => {
            if (err) {
                console.error("error getting logs", err);
                callback({
                    success: false,
                    error: "error getting logs"
                });
                return;
            }

            callback({
                success: true,
                data: {
                    logs,
                    userId
                }
            });
        });
    });
};