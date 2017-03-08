<template lang="jade">
    table#field
        tr.row(v-for="row, rowIndex in field")
            td(
                v-for="item, itemIndex in row",
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
    const Connection = require('../../libs/connection');
    const SharedGame = require('../../../../shared/game');

    module.exports = {
        created() {
            Connection.subscribe('opponentMove', (err, data) => {
                this.$store.commit('opponentMove', data);

                this.checkIsGameWined();
                this.checkIsGameEnded();
            });
        },
        computed: Vuex.mapState({
            selectedMove(state) {
                return state.game.selectedMove;
            },
            field(state) {
                return state.game.field;
            },
            yourTurn(state) {
                return state.user.id === state.game.currentMove;
            }
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
                    x: rowIndex,
                    y: itemIndex,
                    move: this.selectedMove,
                    gameId: this.$store.state.game.gameId
                }, (err, data) => {
                    if (err) console.error(err);
                });

                this.$store.commit('clearSelectedMove');
                this.checkIsGameWined();
                this.checkIsGameEnded();
            },
            checkIsGameWined() {
                let isGameWined = SharedGame.isGameWined(this.field);
                if (isGameWined) this.$store.commit('gameWined');
            },
            checkIsGameEnded() {
                let isGameEnded = SharedGame.isGameEnded(this.field);
                if (isGameEnded) this.$store.commit('gameEnded');
            }
        }
    };
</script>