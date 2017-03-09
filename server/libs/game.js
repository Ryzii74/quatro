const uuid = require('node-uuid');
const SharedGame = require('../../shared/game');

class Game {
    constructor(playerA, playerB) {
        this.id = uuid.v4();
        this.players = [playerA, playerB];
        this.moves = [];
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
        this.moves.push(move);

        return {
            isGameEnded: SharedGame.isGameEnded(this.field),
            isGameWined: SharedGame.isGameWined(this.field)
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