<template lang="jade">
div#gameField
    h1 {{getTurnHeader()}}
    table#field
        tr.row(v-for="row, rowIndex in field")
            td(v-for="item, itemIndex in row",
                v-on:click="makeMove(rowIndex, itemIndex)")
                div.item(v-bind:class=`[
                            (item && item.isRed) ? 'red' : 'green',
                            (item && item.isCircle) ? 'circle' : '',
                            (item && item.isBig) ? 'big' : '',
                            (!item) ? 'empty' : ''
                         ]`)
                    div.item-inner(v-bind:class="(item && item.isEmpty) ? 'empty' : ''")
    moves
</template>

<script>
    const gameMoves = require('./moves.vue');

    const PROPS = ['isRed', 'isBig', 'isEmpty', 'isCircle'];
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

    module.exports = {
        components: {
            moves: gameMoves
        },
        data() {
            return {
                field: [
                    [null, null, null, null],
                    [null, null, null, null],
                    [null, null, null, null],
                    [null, null, null, null]
                ],
                yourTurn: true,
                isGameEnded: false,
                isGameWined: false
            };
        },
        methods: {
            makeMove(rowIndex, itemIndex) {
                if (!this.selectedMove) return;

                this.field[rowIndex][itemIndex] = this.selectedMove;
                this.store.commit('clearSelectedMove');

                this.checkIsGameWined();
                this.checkIsGameEnded();

                this.yourTurn = !this.yourTurn;
            },
            getTurnHeader() {
                if (this.isGameEnded) return 'Игра окончена!';
                if (this.isGameWined) {
                    return (this.yourTurn) ? 'Победил игрок 2!' : 'Победил игрок 1';
                }
                return this.yourTurn ? 'Ход игрока 1' : 'Ход игрока 2';
            },
            checkIsGameWined() {
                let isGameWined = false;

                LINES.forEach(line => {
                    const lineItems = this.getLineItems(line);
                    if (lineItems.filter(el => !el).length) return;

                    PROPS.forEach(prop => {
                        const itemWithPropCount = lineItems.filter(el => el[prop]).length;
                        if (itemWithPropCount % PROPS.length === 0) isGameWined = true;
                    });
                });

                this.isGameWined = isGameWined;
            },
            getLineItems(line) {
                const items = [];
                line.forEach(el => {
                    items.push(this.field[el.x][el.y]);
                });

                return items;
            },
            checkIsGameEnded() {
                let isGameEnded = true;
                const max = this.field.length;
                for (let i = 0; i < max; i++) {
                    for (let j = 0; j < max; j++) {
                        if (this.field[i][j] === null) isGameEnded = false;
                    }
                }

                this.isGameEnded = isGameEnded;
            }
        }
    };
</script>

<style lang="stylus" scoped>
</style>