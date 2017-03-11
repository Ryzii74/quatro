<template lang="jade">
    div#gameField
        h1 {{getTurnHeader()}}
        field
        moves
</template>

<script>
    const gameMoves = require('./moves.vue');
    const gameField = require('./field.vue');
    const Connection = require('../../libs/connection');

    module.exports = {
        components: {
            moves: gameMoves,
            field: gameField
        },
        computed: Vuex.mapState({
            yourTurn: state => state.user.id === state.game.currentMove,
            isGameEnded: state => state.game.isGameEnded,
            winLine: state => state.game.winLine
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