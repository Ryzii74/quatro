<template lang="jade">
    div#gameField
        h1 {{getTurnHeader()}}
        h2 {{gameTime.start}} + {{gameTime.move}}
        timers
        field(
            :field="field",
            :winLine="winLine",
            :makeMove="makeMove"
        )
        moves
        revenge
        chat
</template>

<script>
    const gameMoves = require('./moves.vue');
    const gameField = require('./field.vue');
    const revenge = require('./revenge.vue');
    const chat = require('./chat.vue');
    const timers = require('./timer.vue');
    const Connection = require('../../libs/connection');

    module.exports = {
        components: {
            moves: gameMoves,
            field: gameField,
            revenge,
            chat,
            timers
        },
        computed: Vuex.mapState({
            yourTurn: state => state.user.id === state.game.currentMove,
            isGameEnded: state => state.game.isGameEnded,
            winLine: state => state.game.winLine,
            field: state => state.game.field,
            gameTime: state => state.game.gameTime,
            selectedMove: state => state.game.selectedMove,
            moves: state => state.game.moves,
        }),
        created() {
            Connection.subscribe('opponentMove', data => {
                this.$store.commit('opponentMove', data);
                this.$store.commit('setGameState', data.gameState);
            });
        },
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
            },
            getTurnHeader() {
                if (this.winLine) {
                    return (this.yourTurn) ? 'Вы проиграли!' : 'Вы победили!';
                }
                if (this.isGameEnded) return 'Игра окончена! Ничья!';
                return this.yourTurn ? 'Ваш ход' : 'Ход противника';
            }
        }
    };
</script>

<style lang="stylus" scoped>
</style>