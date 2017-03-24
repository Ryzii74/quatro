const uuid = require('node-uuid');
const SharedGame = require('../../shared/game');

function getCurrentMove(a, b, type) {
    if (type === 'first') return a;
    if (type === 'second') return b;

    return (Math.random() < 0.5) ? a : b;
}

class Game {
    constructor(playerA, playerB, moveType, gameTime) {
        this.id = uuid.v4();
        this.players = [playerA, playerB];
        this.currentMove = getCurrentMove(playerA, playerB, moveType);
        this.field = SharedGame.getDefaultField();
        this.moves = SharedGame.getDefaultMoves();
        this.gameTime = gameTime || {
            start: 120,
            move: 10,
        };
    }

    makeMove(move) {
        this.changeCurrentMove();
        SharedGame.makeMove(
            move.move,
            move.fieldCell,
            this.field,
            this.moves,
        );

        return {
            isGameEnded: SharedGame.isGameEnded(this.field),
            winLine: SharedGame.isGameWined(this.field),
        };
    }

    changeCurrentMove() {
        this.currentMove = this.getOpponent(this.currentMove);
    }

    getOpponent(userId) {
        return this.players.find(id => id !== userId);
    }

    isMoveAvailable(data) {
        return SharedGame.isMoveAvailable(
            data.move,
            data.fieldCell,
            this.field,
            this.moves,
        );
    }
}

module.exports = Game;
