const MOVES = [
    [
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
        }
    ],
    [
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
        }
    ],
    [
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
        }
    ],
    [
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
    ]
];
const FIELD = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
];

module.exports = {
    namespaced: true,

    state: {
        selectedMove: null,
        moves: null,
        field: null,
        yourTurn: null,
        isGameEnded: null,
        isGameWined: null
    },

    mutations: {
        initGame(state) {
            state.moves = Array.from(MOVES);
            state.field = Array.from(FIELD);
            state.isGameEnded = false;
            state.isGameWined = false;
            state.yourTurn = true;
        },

        selectMove(state, data) {
            state.selectedMove = data;
        },

        makeMove(state, field) {
            const move = state.selectedMove;
            state.field[field.x].splice(field.y, 1, state.moves[move.x][move.y]);
            state.moves[move.x][move.y] = null;
        },

        clearSelectedMove(state) {
            state.selectedMove = null;
        },

        gameWined(state) {
            state.isGameWined = true;
        },

        gameEnded(state) {
            state.isGameEnded = true;
        },

        changeTurn(state) {
            state.yourTurn = !state.yourTurn;
        }
    }
};