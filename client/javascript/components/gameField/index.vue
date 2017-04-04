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
        moves(
            :isGameStopped="isGameStopped",
            :moves="moves"
        )
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
    const SharedGame = require('../../../../shared/game');

    module.exports = {
        components: {
            moves: gameMoves,
            field: gameField,
            revenge,
            chat,
            timers,
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
                    y: itemIndex,
                };
                const move = this.selectedMove;

                if (!SharedGame.isMoveAvailable({
                    move,
                    fieldCell,
                    field: this.field,
                    moves: this.moves,
                })) {
                    return;
                }
                if (this.field[rowIndex][itemIndex]) return;
                if (!this.yourTurn) return;

                this.$store.commit('makeMove', fieldCell);

                Connection.send('gameMove', {
                    fieldCell,
                    move,
                    gameId: this.$store.state.game.gameId,
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
            },
        },
    };
</script>

<style lang="stylus">
#gameField
    .win
        background-color #00f

    table td
        border 1px solid #000
        padding 10px

    .item
        width 25px
        height 25px
        position relative
        margin-left 12px
        margin-bottom 12px

        &.big
            width 50px
            height 50px
            margin-left 0
            margin-bottom 0

        &.green
            background-color #0f0

        &.red
            background-color #f00

        &.empty
            width 38px
            height 38px
            background-color #fff

    .item.circle,
    .circle .item-inner.empty
        border-radius 50%

    .item-inner.empty
        position relative
        background-color #fff
        width 15px
        height 15px
        left 5px
        top 5px

    .big .item-inner.empty
        width 40px
        height 40px
</style>
