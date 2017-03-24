const uuid = require('node-uuid');

class GameOffers {
    constructor() {
        this.gameOffers = [];
    }

    get() {
        return this.gameOffers;
    }

    find(userId) {
        return this.gameOffers.find(offer => offer.userId === userId);
    }

    add(gameData) {
        const userGameOffer = this.find(gameData.userId);
        if (userGameOffer) return;

        gameData.gameId = uuid.v4();
        this.gameOffers.push(gameData);
    }

    remove(userId) {
        const gameIndex = this.gameOffers.findIndex(offer => offer.userId === userId);
        if (gameIndex === -1) return;

        this.gameOffers.splice(gameIndex, 1);
    }
}

module.exports = new GameOffers();
