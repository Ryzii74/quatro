const uuid = require('node-uuid');
const GameOffers = require('../libs/gamesOfferManager');

module.exports = socket => {
    socket.on('getGameOffers', ({ type }, callback) => {
        callback({
            success: true,
            data: {
                games: GameOffers.get(type)
            }
        });
    });

    socket.on('createGameOffer', (data, callback) => {
        data.login = socket.user.login;
        data.userId = socket.user.id;
        data.gameId = uuid.v4();
        GameOffers.add(data);

        callback({
            success: true,
            data: {
                games: GameOffers.get(data.type)
            }
        });
    });
};