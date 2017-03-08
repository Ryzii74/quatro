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

module.exports = {
    isGameWined(field) {
        let result = false;

        LINES.forEach(line => {
            const lineItems = getLineItems(field, line);
            if (lineItems.filter(el => !el).length) return;

            PROPS.forEach(prop => {
                const itemWithPropCount = lineItems.filter(el => el[prop]).length;
                if (itemWithPropCount % PROPS.length === 0) result = true;
            });
        });

        return result;
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
    }
};