const SharedGame = require('../../../shared/game');

module.exports = {
    namespaced: true,

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
        messages: []
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
            state.messages = [];
        },

        selectMove(state, data) {
            state.selectedMove = data;
        },

        makeMove(state, fieldCell) {
            SharedGame.makeMove(state.selectedMove, fieldCell, state.field, state.moves);
            state.currentMove = state.players.find(id => state.currentMove !== id);
        },

        opponentMove(state, data) {
            const move = data.move;
            const fieldCell = data.fieldCell;
            state.field[fieldCell.x].splice(fieldCell.y, 1, state.moves[move.x][move.y]);
            state.moves[move.x][move.y] = null;
            state.currentMove = state.players.find(id => state.currentMove !== id);
        },

        clearSelectedMove(state) {
            state.selectedMove = null;
        },

        setGameState(state, gameState) {
            state.winLine = gameState.winLine;
            state.isGameEnded = gameState.isGameEnded;
        },

        gameWined(state, winLine) {
            state.winLine = winLine;
        },

        gameEnded(state) {
            state.isGameEnded = true;
        },

        revenge(state, current) {
            state.revenge = current;
        },

        addMessage(state, message) {
            state.messages.push(message);
        }
    }
};