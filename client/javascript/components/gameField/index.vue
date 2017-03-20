<template lang="jade">
    div#gameField
        h1 {{getTurnHeader()}}
        h2 {{gameTime.start}} + {{gameTime.move}}
        timers
        field
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
            gameTime: state => state.game.gameTime
        }),
        methods: {
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