const MOVES = [
    {
        isRed: true,
        isCircle: true,
        isBig: true,
        isEmpty: true
    },
    {
        isRed: true,
        isCircle: true,
        isBig: true,
        isEmpty: false
    },
    {
        isRed: true,
        isCircle: true,
        isBig: false,
        isEmpty: true
    },
    {
        isRed: true,
        isCircle: false,
        isBig: true,
        isEmpty: true
    },
    {
        isRed: false,
        isCircle: true,
        isBig: true,
        isEmpty: true
    },
    {
        isRed: false,
        isCircle: false,
        isBig: true,
        isEmpty: true
    },
    {
        isRed: false,
        isCircle: true,
        isBig: false,
        isEmpty: true
    },
    {
        isRed: false,
        isCircle: true,
        isBig: true,
        isEmpty: false
    },
    {
        isRed: true,
        isCircle: false,
        isBig: false,
        isEmpty: true
    },
    {
        isRed: true,
        isCircle: true,
        isBig: false,
        isEmpty: false
    },
    {
        isRed: true,
        isCircle: false,
        isBig: true,
        isEmpty: false
    },
    {
        isRed: false,
        isCircle: false,
        isBig: false,
        isEmpty: false
    },
    {
        isRed: true,
        isCircle: false,
        isBig: false,
        isEmpty: false
    },
    {
        isRed: false,
        isCircle: true,
        isBig: false,
        isEmpty: false
    },
    {
        isRed: false,
        isCircle: false,
        isBig: true,
        isEmpty: false
    },
    {
        isRed: false,
        isCircle: false,
        isBig: false,
        isEmpty: true
    }
];
const FIELD = [
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
];

function getDefaultMoves() {
    const result = [];
    const moves = MOVES.slice();
    while (moves.length) {
        result.push(moves.splice(0, 4));
    }
    return result;
}

function getDefaultField() {
    const result = [];
    const field = FIELD.slice();
    while (field.length) {
        result.push(field.splice(0, 4));
    }
    return result;
}

module.exports = {
    namespaced: true,

    state: {
        selectedMove: null,
        moves: null,
        field: null,
        currentMove: null,
        isGameEnded: null,
        isGameWined: null,
        players: null,
        gameId: null
    },

    mutations: {
        startGame(state, data) {
            state.moves = getDefaultMoves();
            state.field = getDefaultField();
            state.isGameEnded = false;
            state.isGameWined = false;
            state.currentMove = data.currentMove;
            state.players = data.players;
            state.gameId = data.gameId;
        },

        selectMove(state, data) {
            state.selectedMove = data;
        },

        makeMove(state, field) {
            const move = state.selectedMove;
            state.field[field.x].splice(field.y, 1, state.moves[move.x][move.y]);
            state.moves[move.x][move.y] = null;
            state.currentMove = state.players.find(id => state.currentMove !== id);
        },

        opponentMove(state, data) {
            const move = data.move;
            state.field[data.x].splice(data.y, 1, state.moves[move.x][move.y]);
            state.moves[move.x][move.y] = null;
            state.currentMove = state.players.find(id => state.currentMove !== id);
        },

        clearSelectedMove(state) {
            state.selectedMove = null;
        },

        gameWined(state) {
            state.isGameWined = true;
        },

        gameEnded(state) {
            state.isGameEnded = true;
        }
    }
};