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
        field: null
    },

    mutations: {
        initGame(state) {
            state.moves = Array.from(MOVES);
            state.field = Array.from(FIELD);
        },
        selectMove(state, data) {
            state.selectedMove = data;
        },

        makeMove(state, field) {
            const move = state.selectedMove;
            state.field[field.x][field.y] = state.moves[move.x][move.y];
            state.moves[move.x][move.y] = null;
        },

        clearSelectedMove(state) {
            state.selectedMove = null;
        }
    }
};