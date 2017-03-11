const uuid = require('node-uuid');
const SharedGame = require('../../shared/game');

class Game {
    constructor(playerA, playerB) {
        this.id = uuid.v4();
        this.players = [playerA, playerB];
        this.currentMove = (Math.random() < 0.5) ? playerA : playerB;
        this.field = SharedGame.getDefaultField();
        this.moves = SharedGame.getDefaultMoves();
    }

    makeMove(move) {
        this.changeCurrentMove();
        SharedGame.makeMove(
            move.move,
            move.fieldCell,
            this.field,
            this.moves
        );

        return {
            isGameEnded: SharedGame.isGameEnded(this.field),
            winLine: SharedGame.isGameWined(this.field)
        }
    }

    changeCurrentMove() {
        this.currentMove = this.getOpponent(this.currentMove);
    }

    getOpponent(userId) {
        return this.players.find(id => id !== userId);
    }
}

module.exports = Game;