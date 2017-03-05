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
        created() {
            this.$store.commit('initGame');
        },
        computed: Vuex.mapState({
            selectedMove(state) {
                return state.game.selectedMove;
            },
            yourTurn(state) {
                return state.game.yourTurn;
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
                if (this.isGameEnded) return 'Игра окончена!';
                if (this.isGameWined) {
                    return (this.yourTurn) ? 'Победил игрок 2!' : 'Победил игрок 1';
                }
                return this.yourTurn ? 'Ход игрока 1' : 'Ход игрока 2';
            }
        }
    };
</script>

<style lang="stylus" scoped>
</style>