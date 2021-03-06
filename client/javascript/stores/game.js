const SharedGame = require('../../../shared/game');

module.exports = {
    state: {
        selectedMove: null,
        moves: null,
        field: null,
        currentMove: null,
        isGameEnded: null,
        winLine: null,
        players: null,
        gameId: null,
        revenge: null,
    },

    mutations: {
        startGame(state, data) {
            state.moves = SharedGame.getDefaultMoves();
            state.field = SharedGame.getDefaultField();
            state.isGameEnded = false;
            state.winLine = null;
            state.currentMove = data.currentMove;
            state.players = data.players;
            state.gameId = data.gameId;
            state.revenge = null;
            state.gameTime = data.gameTime;
        },

        selectMove(state, data) {
            state.selectedMove = data;
        },

        makeMove(state, fieldCell) {
            SharedGame.makeMove({
                move: state.selectedMove,
                fieldCell,
                field: state.field,
                moves: state.moves,
            });
            state.currentMove = state.players.find(id => state.currentMove !== id);

            const winLine = SharedGame.isGameWined(state.field);
            if (winLine) state.winLine = winLine;

            const isGameEnded = SharedGame.isGameEnded(state.field);
            if (isGameEnded) state.isGameEnded = true;
        },

        opponentMove(state, data) {
            const move = data.move;
            const fieldCell = data.fieldCell;
            state.field[fieldCell.x].splice(fieldCell.y, 1, state.moves[move.x][move.y]);
            state.moves[move.x].splice(move.y, 1, null);
            state.currentMove = state.players.find(id => state.currentMove !== id);
        },

        clearSelectedMove(state) {
            state.selectedMove = null;
        },

        setGameState(state, gameState) {
            state.winLine = gameState.winLine;
            state.isGameEnded = gameState.isGameEnded;
        },

        setCurrentGame(state, gameId) {
            state.gameId = gameId;
        },

        revenge(state, current) {
            state.revenge = current;
        },
    },
};
