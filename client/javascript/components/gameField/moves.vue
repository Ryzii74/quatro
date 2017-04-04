<template lang="jade">
    table#moves
        tr.row(v-for="row, rowIndex in moves")
            td(
                v-for="item, itemIndex in row",
                @click="selectMove(rowIndex, itemIndex)",
                :class="(isItemSelected(rowIndex, itemIndex)) ? 'selected' : ''"
            )
                div.item(:class=`[
                    (item && item.isRed) ? 'red' : 'green',
                    (item && item.isCircle) ? 'circle' : '',
                    (item && item.isBig) ? 'big' : '',
                    (!item) ? 'empty' : ''
                ]`)
                    div.item-inner(:class="(item && item.isEmpty) ? 'empty' : ''")

</template>

<script>
    module.exports = {
        props: ['moves', 'isGameStopped'],
        computed: Vuex.mapState({
            selectedMove: state => state.game.selectedMove,
            isMoveAvailable: state => !this.isGameStopped
                && state.game.currentMove === state.user.id,
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
                    y: itemIndex,
                });
            },
        },
    };
</script>

<style lang="stylus" scoped>
#gameField #moves .selected
    background-color #600013
</style>
