const SocketServer = require('../libs/socketServer');
const RevengeManager = require('../libs/revengeManager');
const GamesManager = require('../libs/gamesManager');

module.exports = socket => {
    socket.on('offerRevenge', (data, callback) => {
        RevengeManager.add(socket.user.id, data.userId);
        SocketServer.send(data.userId, 'offerRevenge', {});
        callback({ success: true });
    });

    socket.on('cancelRevenge', (data, callback) => {
        RevengeManager.remove(data.userId);
        SocketServer.send(data.userId, 'cancelRevenge', {});
        callback({ success: true });
    });

    socket.on('acceptRevenge', (data, callback) => {
        RevengeManager.remove(data.userId);
        GamesManager.create(socket.user.id, data.userId);
        callback({ success: true });
    });
};
