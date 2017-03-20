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
    const Connection = require('../../libs/connection');
    const SharedGame = require('../../../../shared/game');

    module.exports = {
        created() {
            Connection.subscribe('opponentMove', data => {
                this.$store.commit('opponentMove', data);
                this.$store.commit('setGameState', data.gameState);
            });
        },
        computed: Vuex.mapState({
            selectedMove: state => state.game.selectedMove,
            moves: state => state.game.moves,
            field: state => state.game.field,
            yourTurn: state => state.user.id === state.game.currentMove,
            winLine: state => state.game.winLine
        }),
        methods: {
            makeMove(rowIndex, itemIndex) {
                if (!this.selectedMove) return;
                const fieldCell = {
                    x: rowIndex,
                    y: itemIndex
                };

                if (!SharedGame.isMoveAvailable(
                        this.selectedMove,
                        fieldCell,
                        this.field,
                        this.moves
                    )) return;
                if (this.field[rowIndex][itemIndex]) return;
                if (!this.yourTurn) return;

                this.$store.commit('makeMove', fieldCell);

                Connection.send('gameMove', {
                    fieldCell,
                    move: this.selectedMove,
                    gameId: this.$store.state.game.gameId
                }, (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    this.$store.commit('setGameState', data.gameState);
                });

                this.$store.commit('clearSelectedMove');
                this.checkIsGameWined();
                this.checkIsGameEnded();
            },
            checkIsGameWined() {
                const isGameWined = SharedGame.isGameWined(this.field);
                if (isGameWined) this.$store.commit('gameWined');
            },
            checkIsGameEnded() {
                const isGameEnded = SharedGame.isGameEnded(this.field);
                if (isGameEnded) this.$store.commit('gameEnded');
            },
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