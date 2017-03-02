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
        var gameIndex = this.gameOffers.findIndex(game => game.author === gameAuthor);
        if (gameIndex === -1) return;

        Games.splice(gameIndex, 1);
    }
}

module.exports = new GameOffers();