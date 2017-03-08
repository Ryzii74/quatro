<template lang="jade">
    div#gameField
        h1 {{getTurnHeader()}}
        field
        moves
</template>

<script>
    const gameMoves = require('./moves.vue');
    const gameField = require('./field.vue');

    module.exports = {
        components: {
            moves: gameMoves,
            field: gameField
        },
        computed: Vuex.mapState({
            yourTurn(state) {
                return state.user.id === state.game.currentMove;
            },
            isGameEnded(state) {
                return state.game.isGameEnded;
            },
            isGameWined(state) {
                return state.game.isGameWined;
            }
        }),
        methods: {
            getTurnHeader() {
                if (this.isGameWined) {
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