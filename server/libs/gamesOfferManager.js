class GameOffers {
    constructor() {
        this.gameOffers = [];
    }

    get(type) {
        return this.gameOffers.filter(game => game.type === type);
    }

    add(gameData) {
        const userGameOffer = this.gameOffers.find(offer => offer.userId === gameData.userId);
        if (userGameOffer) return;

        this.gameOffers.push(gameData);
    }

    remove(gameAuthor) {
        const gameIndex = this.gameOffers.findIndex(game => game.author === gameAuthor);
        if (gameIndex === -1) return;

        this.gameOffers.splice(gameIndex, 1);
    }
}

module.exports = new GameOffers();