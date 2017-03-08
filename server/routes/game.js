const GamesOfferManager = require('../libs/gamesOfferManager');
const GamesManager = require('../libs/gamesManager');
const SocketServer = require('../libs/socketServer');

module.exports = socket => {
    socket.on('startGame', (data, callback) => {
        if (!socket.user) return;

        const gameOffer = GamesOfferManager.find(data.userId);
        if (!gameOffer) return callback({
            success: false,
            error: 'game not found'
        });

        GamesManager.create(data.userId, socket.user.id);
        GamesOfferManager.remove(data.userId);
    });

    socket.on('gameMove', (data, callback) => {
        const currentGame = GamesManager.get(data.gameId);
        currentGame.makeMove(data.x, data.y, data.move);

        const opponent = currentGame.getOpponent(socket.user.id);
        SocketServer.send(opponent, 'opponentMove', {
            success: true,
            data
        });

        callback({
            success: true
        });
    });
};