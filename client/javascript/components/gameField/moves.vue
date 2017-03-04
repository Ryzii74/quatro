<template lang="jade">
    table#moves
        tr.row(v-for="row, rowIndex in moves")
            td(v-for="item, itemIndex in row",
                v-on:click="selectMove(rowIndex, itemIndex)",
                v-bind:class="(isItemSelected(rowIndex, itemIndex)) ? 'selected' : ''"
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
    module.exports = {
        computed: Vuex.mapState({
            selectedMove(game) {
                return game.selectedMove;
            }
        }),
        data() {
            return {
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
                ]
            };
        },
        methods: {
            isItemSelected(rowIndex, itemIndex) {
                return this.selectedMove
                        && this.selectedMove.x === rowIndex
                        && this.selectedMove.y === itemIndex;
            },
            selectMove(rowIndex, itemIndex) {
                if (this.moves[rowIndex][itemIndex] === null) return;

                this.$store.commit('game/selectMove', {
                    x: rowIndex,
                    y: itemIndex
                });
            },
            getSelectedMove() {
                return this.moves[this.selectedMove.x][this.selectedMove.y];
            },
            clearSelectedMove() {
                this.moves[this.selectedMove.x][this.selectedMove.y] = null;
            }
        }
    };
</script>