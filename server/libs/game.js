const uuid = require('node-uuid');

class Game {
    constructor(playerA, playerB) {
        this.id = uuid.v4();
        this.players = [playerA, playerB];
        this.moves = [];
        this.currentMove = (Math.random() < 0.5) ? playerA : playerB;
    }

    makeMove(move) {
        this.moves.push(move);
    }
}

module.exports = Game;