<template lang="jade">
div#gameOffers
    table
        tr(
            v-for="game, index in games",
            v-bind:class="isMyOffer(game) ? 'my' : ''"
        )
            td {{index + 1}}
            td {{game.login}}
    a(
        href="#",
        v-on:click.prevent="createGame()"
        v-if="!isGameOfferCreated()"
    ) Создать игру
</template>

<script>
    const Connection = require('../libs/connection');

    module.exports = {
        created() {
            this.getGames();
        },
        computed: Vuex.mapState({
            games(state) {
                return state.main.games;
            },
            userId(state) {
                return state.user.id;
            }
        }),
        methods: {
            isMyOffer(game) {
                return game.userId === this.userId;
            },

            isGameOfferCreated() {
                return this.games.findIndex(this.isMyOffer) !== -1;
            },

            createGame() {
                Connection.send('createGameOffer', { type: 'test' }, (err, data) => {
                    if (err) {
                        console.error('error creating game', err);
                        return;
                    }

                    this.$store.commit('initGamesList', data.games);
                });
            },

            getGames() {
                Connection.send('getGameOffers', { type: 'test' }, (err, data) => {
                    if (err) {
                        console.error('error getting games list', err);
                        return;
                    }

                    this.$store.commit('initGamesList', data.games);
                });
            }
        }
    };
</script>

<style lang="stylus">
tr.my
    background-color #0f0
</style>