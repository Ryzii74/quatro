const LINES = [
    [
        {
            x: 0,
            y: 0
        },
        {
            x: 0,
            y: 1
        },
        {
            x: 0,
            y: 2
        },
        {
            x: 0,
            y: 3
        }
    ],
    [
        {
            x: 1,
            y: 0
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 1,
            y: 2
        },
        {
            x: 1,
            y: 3
        }
    ],
    [
        {
            x: 2,
            y: 0
        },
        {
            x: 2,
            y: 1
        },
        {
            x: 2,
            y: 2
        },
        {
            x: 2,
            y: 3
        }
    ],
    [
        {
            x: 3,
            y: 0
        },
        {
            x: 3,
            y: 1
        },
        {
            x: 3,
            y: 2
        },
        {
            x: 3,
            y: 3
        }
    ],
    [
        {
            x: 0,
            y: 0
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 2,
            y: 0
        },
        {
            x: 3,
            y: 0
        }
    ],
    [
        {
            x: 0,
            y: 1
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 2,
            y: 1
        },
        {
            x: 3,
            y: 1
        }
    ],
    [
        {
            x: 0,
            y: 2
        },
        {
            x: 1,
            y: 2
        },
        {
            x: 2,
            y: 2
        },
        {
            x: 3,
            y: 2
        }
    ],
    [
        {
            x: 0,
            y: 3
        },
        {
            x: 1,
            y: 3
        },
        {
            x: 2,
            y: 3
        },
        {
            x: 3,
            y: 3
        }
    ],
    [
        {
            x: 0,
            y: 0
        },
        {
            x: 1,
            y: 1
        },
        {
            x: 2,
            y: 2
        },
        {
            x: 3,
            y: 3
        }
    ],
    [
        {
            x: 0,
            y: 3
        },
        {
            x: 1,
            y: 2
        },
        {
            x: 2,
            y: 1
        },
        {
            x: 3,
            y: 0
        }
    ]
];
const PROPS = ['isRed', 'isBig', 'isEmpty', 'isCircle'];

function getLineItems(field, line) {
    const items = [];
    line.forEach(el => {
        items.push(field[el.x][el.y]);
    });

    return items;
}

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

module.exports = {
    isGameWined(field) {
        let winLine = null;

        LINES.forEach(line => {
            const lineItems = getLineItems(field, line);
            if (lineItems.filter(el => !el).length) return;

            PROPS.forEach(prop => {
                const itemWithPropCount = lineItems.filter(el => el[prop]).length;
                if (itemWithPropCount % PROPS.length === 0) {
                    winLine = line;
                }
            });
        });

        return winLine;
    },
    isGameEnded(field) {
        let result = true;
        const max = field.length;
        for (let i = 0; i < max; i++) {
            for (let j = 0; j < max; j++) {
                if (field[i][j] === null) result = false;
            }
        }

        return result;
    },
    getDefaultMoves() {
        const result = [];
        const moves = MOVES.slice();
        while (moves.length) {
            result.push(moves.splice(0, 4));
        }
        return result;
    },
    getDefaultField() {
        const result = [];
        const field = FIELD.slice();
        while (field.length) {
            result.push(field.splice(0, 4));
        }
        return result;
    },
    makeMove(move, fieldCell, field, moves) {
        field[fieldCell.x].splice(fieldCell.y, 1, moves[move.x][move.y]);
        moves[move.x][move.y] = null;
    }
};