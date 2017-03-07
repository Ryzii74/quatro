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
        data.login = socket.login;
        GameOffers.add(data);

        callback({
            success: true,
            data: {
                games: GameOffers.get(data.type)
            }
        });
    });
};