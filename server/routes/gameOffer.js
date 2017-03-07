const uuid = require('node-uuid');
const GameOffers = require('../libs/gamesOfferManager');

module.exports = socket => {
    socket.on('getGameOffers', ({ type }, callback) => {
        callback({
            success: true,
            data: {
                games: GameOffers.get()
            }
        });
    });

    socket.on('createGameOffer', (data, callback) => {
        if (!socket.user.id) {
            callback({
                success: true,
                data: {
                    games: GameOffers.get()
                }
            });
            return;
        }

        data.login = socket.user.login;
        data.userId = socket.user.id;
        data.gameId = uuid.v4();
        GameOffers.add(data);

        callback({
            success: true,
            data: {
                games: GameOffers.get()
            }
        });
    });

    socket.on('removeGameOffer', (data, callback) => {
        GameOffers.remove(socket.user.id);
        callback({
            success: true,
            data: {
                games: GameOffers.get()
            }
        });
    });
};