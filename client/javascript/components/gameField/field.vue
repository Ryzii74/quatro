<template lang="jade">
    table#field
        tr.row(v-for="row, rowIndex in field")
            td(v-for="item, itemIndex in row",
                v-on:click="makeMove(rowIndex, itemIndex)"
            )
                div.item(v-bind:class=`[
                    (item && item.isRed) ? 'red' : 'green',
                    (item && item.isCircle) ? 'circle' : '',
                    (item && item.isBig) ? 'big' : '',
                    (!item) ? 'empty' : ''
                ]`)
                    div.item-inner(v-bind:class="(item && item.isEmpty) ? 'empty' : ''")
</template>

<script>
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
        computed: Vuex.mapState({
            selectedMove(state) {
                return state.game.selectedMove;
            },
            field(state) {
                return state.game.field;
            },
            yourTurn(state) {
                return state.game.yourTurn;
            },
            isGameEnded(state) {
                return state.game.isGameEnded;
            },
            isGameWined(state) {
                return state.game.isGameWined;
            }
        }),
        methods: {
            makeMove(rowIndex, itemIndex) {
                if (!this.selectedMove) return;
                this.$store.commit('makeMove', {
                    x: rowIndex,
                    y: itemIndex
                });
                this.$store.commit('clearSelectedMove');

                this.checkIsGameWined();
                this.checkIsGameEnded();

                this.$store.commit('changeTurn');
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

                if (isGameWined) this.$store.commit('gameWined');
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

                if (isGameEnded) this.$store.commit('gameEnded');
            }
        }
    };
</script>