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

#field table td
    border 1px solid #000;
    padding 10px;


#field #moves .selected
    background-color #600013;


#field .item
    width 25px;
    height 25px;
    position relative;
    margin-left 12px;
    margin-bottom 12px;

#field .item.big
    width 50px;
    height 50px;
    margin-left 0;
    margin-bottom 0;

#field .item.green
    background-color #0f0;

#field .item.red
    background-color #f00;

#field .item.circle,
#field .circle .item-inner.empty
    border-radius 50%;

#field .item-inner.empty
    position relative;
    background-color #fff;
    width 15px;
    height 15px;
    left 5px;
    top 5px;

#field .big .item-inner.empty
    width 40px;
    height 40px;

#field .item.empty
    width 38px;
    height 38px;
    background-color #fff;

</style>