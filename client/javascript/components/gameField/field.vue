<template lang="jade">
    table#field
        tr.row(v-for="row, rowIndex in field")
            td(
                v-for="item, itemIndex in row",
                @click="makeMove(rowIndex, itemIndex)",
                :class="{ win: isCellWined(rowIndex, itemIndex) }"
            )
                div.item(:class=`{
                    red: item && item.isRed,
                    green: item && !item.isRed,
                    circle: item && item.isCircle,
                    big: item && item.isBig,
                    empty: !item
                }`)
                    div.item-inner(:class="{empty: item && item.isEmpty}")
</template>

<script>
    module.exports = {
        props: ['field', 'makeMove', 'winLine'],
        computed: Vuex.mapState({
            winLine: state => state.game.winLine
        }),
        methods: {
            isCellWined(x, y) {
                if (!this.winLine) return false;

                let result = false;
                this.winLine.forEach(el => {
                    if (el.x === x && el.y === y) result = true;
                });
                return result;
            }
        }
    };
</script>

<style lang="stylus" scoped>
#field .win
    background-color #00f;
</style>