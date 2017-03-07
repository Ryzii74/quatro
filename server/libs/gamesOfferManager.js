class GameOffers {
    constructor() {
        this.gameOffers = [];
    }

    get() {
        return this.gameOffers;
    }

    add(gameData) {
        const userGameOffer = this.gameOffers.find(offer => offer.userId === gameData.userId);
        if (userGameOffer) return;

        this.gameOffers.push(gameData);
    }

    remove(userId) {
        const gameIndex = this.gameOffers.findIndex(offer => offer.userId === userId);
        if (gameIndex === -1) return;

        this.gameOffers.splice(gameIndex, 1);
    }
}

module.exports = new GameOffers();