class GameOffers {
    constructor() {
        this.gameOffers = [];
    }

    get(type) {
        return this.gameOffers.filter(game => game.type === type);
    }

    add(gameData) {
        this.gameOffers.push(gameData);
    }

    remove(gameAuthor) {
        const gameIndex = this.gameOffers.findIndex(game => game.author === gameAuthor);
        if (gameIndex === -1) return;

        this.gameOffers.splice(gameIndex, 1);
    }
}

module.exports = new GameOffers();