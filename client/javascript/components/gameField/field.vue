<template lang="jade">
    table#field
        tr.row(v-for="row, rowIndex in field")
            td(
                v-for="item, itemIndex in row",
                @click="makeMove(rowIndex, itemIndex)"
            )
                div.item(:class=`[
                    (item && item.isRed) ? 'red' : 'green',
                    (item && item.isCircle) ? 'circle' : '',
                    (item && item.isBig) ? 'big' : '',
                    (!item) ? 'empty' : ''
                ]`)
                    div.item-inner(:class="{empty: item && item.isEmpty}")
</template>

<script>
    const Connection = require('../../libs/connection');
    const SharedGame = require('../../../../shared/game');

    module.exports = {
        created() {
            Connection.subscribe('opponentMove', (err, data) => {
                this.$store.commit('opponentMove', data);
                this.$store.commit('setGameState', data.gameState);
            });
        },
        computed: Vuex.mapState({
            selectedMove: state => state.game.selectedMove,
            field: state => state.game.field,
            yourTurn: state => state.user.id === state.game.currentMove
        }),
        methods: {
            makeMove(rowIndex, itemIndex) {
                if (!this.selectedMove) return;
                if (this.field[rowIndex][itemIndex]) return;
                if (!this.yourTurn) return;

                this.$store.commit('makeMove', {
                    x: rowIndex,
                    y: itemIndex
                });

                Connection.send('gameMove', {
                    fieldCell: {
                        x: rowIndex,
                        y: itemIndex
                    },
                    move: this.selectedMove,
                    gameId: this.$store.state.game.gameId
                }, (err, data) => {
                    if (err) console.error(err);
                    this.$store.commit('setGameState', data.gameState);
                });

                this.$store.commit('clearSelectedMove');
            },
            checkIsGameWined() {
                const isGameWined = SharedGame.isGameWined(this.field);
                if (isGameWined) this.$store.commit('gameWined');
            },
            checkIsGameEnded() {
                const isGameEnded = SharedGame.isGameEnded(this.field);
                if (isGameEnded) this.$store.commit('gameEnded');
            }
        }
    };
</script>