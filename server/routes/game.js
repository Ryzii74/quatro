const GamesOfferManager = require('../libs/gamesOfferManager');
const GamesManager = require('../libs/gamesManager');
const SocketServer = require('../libs/socketServer');
const GameLog = require('../models/gameLogs');

module.exports = socket => {
    socket.on('startGame', (data, callback) => {
        if (!socket.user) return;

        const gameOffer = GamesOfferManager.find(data.userId);
        if (!gameOffer) {
            callback({
                success: false,
                error: 'game not found',
            });
            return;
        }

        GamesManager.create(data.userId, socket.user.id, gameOffer.moveType);
        GamesOfferManager.remove(data.userId);
    });

    socket.on('gameMove', (data, callback) => {
        const currentGame = GamesManager.get(data.gameId);
        if (!currentGame) {
            callback({
                success: false,
                error: 'game not found',
            });
            return;
        }
        if (!currentGame.isMoveAvailable(data)) {
            callback({
                success: false,
                error: 'move not available',
            });
            return;
        }

        data.gameState = currentGame.makeMove(data);

        if (data.gameState.winLine || data.gameState.isGameEnded) {
            let winner = null;
            if (data.gameState.winLine) winner = socket.user.id;
            GamesManager.remove(currentGame.id);

            const log = new GameLog({
                players: currentGame.players,
                field: currentGame.field,
                winner,
            });
            log.save(err => err && console.error('error saving log', err));
        }

        const opponent = currentGame.getOpponent(socket.user.id);
        SocketServer.send(opponent, 'opponentMove', {
            success: true,
            data,
        });

        callback({
            success: true,
            data: {
                gameState: data.gameState,
            },
        });
    });

    socket.on('gameMessage', (data, callback) => {
        SocketServer.send(data.to, 'newGameMessage', {
            success: true,
            data: {
                text: data.text,
                userId: socket.user.id,
                login: socket.user.login,
            },
        });

        callback({ success: true });
    });
};
