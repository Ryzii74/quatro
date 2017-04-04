<template lang="jade">
    table#field
        tr.row(v-for="row, rowIndex in field")
            td(
                v-for="item, itemIndex in row",
                @click="makeMove && makeMove(rowIndex, itemIndex)",
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
        methods: {
            isCellWined(x, y) {
                if (!this.winLine) return false;
                return this.winLine.some(el => el.x === x && el.y === y);
            }
        }
    };
</script>

<style lang="stylus" scoped>
</style>
