<template lang="jade">
    table#moves
        tr.row(v-for="row, rowIndex in moves")
            td(
                v-for="item, itemIndex in row",
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
            selectedMove(state) {
                return state.game.selectedMove;
            },
            moves(state) {
                return state.game.moves;
            },
            isMoveAvailable(state) {
                return !state.game.isGameWined
                        && !state.game.isGameEnded
                        && state.game.currentMove === state.user.id;
            }
        }),
        methods: {
            isItemSelected(rowIndex, itemIndex) {
                return this.selectedMove
                        && this.selectedMove.x === rowIndex
                        && this.selectedMove.y === itemIndex;
            },
            selectMove(rowIndex, itemIndex) {
                if (!this.isMoveAvailable) return;
                if (this.moves[rowIndex][itemIndex] === null) return;
                if (this.isItemSelected(rowIndex, itemIndex)) {
                    this.$store.commit('clearSelectedMove');
                    return;
                }

                this.$store.commit('selectMove', {
                    x: rowIndex,
                    y: itemIndex
                });
            }
        }
    };
</script>