const GameLogs = require('../libs/gameLogs');

module.exports = socket => {
    socket.on('getGameLogs', (data, callback) => {
        if (!socket.user) return callback({
            success: false,
            error: 'need auth'
        });

        GameLogs.get(socket.user.id, data.skip, (err, logs) => {
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
                data: { logs }
            });
        });
    });
};