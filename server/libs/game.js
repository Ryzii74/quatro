const uuid = require('node-uuid');

class Game {
    constructor(playerA, playerB) {
        this.id = uuid.v4();
        this.players = [playerA, playerB];
        this.moves = [];
    }

    makeMove(move) {
        this.moves.push(move);
    }
}

module.exports = Game;