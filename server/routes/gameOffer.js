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
};