var gameField = {
    template: `
        <div id="gameField">
            <h1>{{getTurnHeader()}}</h1>
            <table id="field">
                <tr class="row" v-for="row, rowIndex in field">
                    <td v-for="item, itemIndex in row"
                        v-on:click="makeMove(rowIndex, itemIndex)">
                        <div class="item"
                             v-bind:class="[
                                (item && item.isRed) ? 'red' : 'green',
                                (item && item.isCircle) ? 'circle' : '',
                                (item && item.isBig) ? 'big' : '',
                                (!item) ? 'empty' : ''
                             ]">
                            <div class="item-inner"
                                 v-bind:class="(item && item.isEmpty) ? 'empty' : ''"></div>
                        </div>
                    </td>
                </tr>
            </table>

            <table id="moves">
                <tr class="row" v-for="row, rowIndex in moves">
                    <td v-for="item, itemIndex in row"
                        v-on:click="selectMove(rowIndex, itemIndex)"
                        v-bind:class="(isItemSelected(rowIndex, itemIndex)) ? 'selected' : ''">
                        <div class="item"
                             v-bind:class="[
                                (item && item.isRed) ? 'red' : 'green',
                                (item && item.isCircle) ? 'circle' : '',
                                (item && item.isBig) ? 'big' : '',
                                (!item) ? 'empty' : ''
                             ]">
                            <div class="item-inner"
                                 v-bind:class="(item && item.isEmpty) ? 'empty' : ''"></div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    `,
    data: {
        field: [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ],
        moves: [
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
        ],
        yourTurn: true,
        selectedMove: null,
        isGameEnded: false,
        isGameWined: false
    },
    methods: {
        selectMove: function (rowIndex, itemIndex) {
            //if (!this.yourTurn) return;
            if (this.isGameWined || this.isGameEnded) return;
            if (this.moves[rowIndex][itemIndex] === null) return;

            this.selectedMove = {};
            this.selectedMove.x = rowIndex;
            this.selectedMove.y = itemIndex;
        },
        makeMove: function (rowIndex, itemIndex) {
            if (!this.selectedMove) return;
            this.field[rowIndex][itemIndex] = this.moves[this.selectedMove.x][this.selectedMove.y];
            this.moves[this.selectedMove.x][this.selectedMove.y] = null;
            this.selectedMove = null;

            this.checkIsGameWined();
            this.checkIsGameEnded();

            this.yourTurn = !this.yourTurn;
        },
        isItemSelected: function (rowIndex, itemIndex) {
            return this.selectedMove
                && this.selectedMove.x === rowIndex
                && this.selectedMove.y === itemIndex;
        },
        getTurnHeader: function () {
            if (this.isGameEnded) return "Игра окончена!";
            if (this.isGameWined) {
                return (this.yourTurn) ? "Победил игрок 2!" : "Победил игрок 1";
            }
            return this.yourTurn ? "Ход игрока 1" : "Ход игрока 2";
        },
        checkIsGameWined: function () {
            let isGameWined = false;

            LINES.forEach(line => {
                var lineItems = this.getLineItems(line);
                if (lineItems.filter(el => !el).length) return;

                PROPS.forEach(prop => {
                    var itemWithPropCount = lineItems.filter(el => el[prop]).length;
                    if (itemWithPropCount % PROPS.length === 0) isGameWined = true;
                });
            });

            this.isGameWined = isGameWined;
        },
        getLineItems: function(line) {
            let items = [];
            line.forEach(el => {
                items.push(this.field[el.x][el.y]);
            });

            return items;
        },
        checkIsGameEnded: function () {
            let isGameEnded = true;
            let max = this.field.length;
            for (let i = 0; i < max; i++) {
                for (let j = 0; j < max; j++) {
                    if (this.field[i][j] === null) isGameEnded = false;
                }
            }

            this.isGameEnded = isGameEnded;
        }
    }
};

const PROPS = [ 'isRed', 'isBig', 'isEmpty', 'isCircle' ];

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