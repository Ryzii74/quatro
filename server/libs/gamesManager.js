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
                currentMove: game.currentMove,
                gameTime: game.gameTime,
            },
        };

        SocketServer.send(playerA, 'startGame', data);
        SocketServer.send(playerB, 'startGame', data);
    },

    getByPlayer(playerId) {
        return Object.keys(games)
            .find(gameId => games[gameId].players.indexOf(playerId) !== -1);
    },

    get(gameId) {
        return games[gameId];
    },

    remove(gameId) {
        delete games[gameId];
    },
};
