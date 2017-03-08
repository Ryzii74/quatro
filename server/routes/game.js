const GamesOfferManager = require('../libs/gamesOfferManager');
const GamesManager = require('../libs/gamesManager');

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
};