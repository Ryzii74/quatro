const uuid = require('node-uuid');

class Game {
    constructor(playerA, playerB) {
        this.id = uuid.v4();
        this.players = [playerA, playerB];
        this.moves = [];
        this.currentMove = (Math.random() < 0.5) ? playerA : playerB;
        this.field = [];
        this.moves = [];
    }

    makeMove(move) {
        this.changeCurrentMove();
        this.moves.push(move);
    }

    changeCurrentMove() {
        this.currentMove = this.getOpponent(this.currentMove);
    }

    getOpponent(userId) {
        return this.players.find(id => id !== userId);
    }
}

module.exports = Game;