const Game = require('./game');
const SocketServer = require('./socketServer');

const games = {};

module.exports = {
    create(playerA, playerB, moveType) {
        const game = new Game(playerA, playerB, moveType);
        games[game.id] = game;

        const data = {
            success: true,
            data: {
                gameId: game.id,
                players: game.players,
                currentMove: game.currentMove
            }
        };

        SocketServer.send(playerA, 'startGame', data);
        SocketServer.send(playerB, 'startGame', data);
    },

    get(gameId) {
        return games[gameId];
    },

    remove(gameId) {
        delete games[gameId];
    }
};