<template lang="jade">
div#gameOffers
    table
        tr(
            v-for="game, index in games",
            :class="isMyOffer(game) ? 'my' : ''"
        )
            td {{index + 1}}
            td {{game.login}}
            td {{game.moveType}}
            td(
                @click="removeMyOffer()",
                v-if="isMyOffer(game)"
            ) Remove
            td(
                @click="startGame(game)",
                v-if="!isMyOffer(game)"
            ) Join
    a(
        href="#",
        @click.prevent="createGame('none')",
        v-if="!isGameOfferCreated()"
    ) Создать игру
    a(
        href="#",
        @click.prevent="createGame('first')",
        v-if="!isGameOfferCreated()"
    ) Создать игру с первым ходом
    a(
        href="#",
        @click.prevent="createGame('second')",
        v-if="!isGameOfferCreated()"
    ) Создать игру со вторым ходом
</template>

<script>
    const Connection = require('../libs/connection');
    const Config = require('../config');

    module.exports = {
        created() {
            this.getGames();
            this.intervalGameOffersUpdating = setInterval(
                this.getGames.bind(this),
                Config.intervalUpdatingGameOffersList
            );

            Connection.subscribe('startGame', data => {
                this.$store.commit('startGame', data);
                this.$router.push('/game');
            });
        },
        computed: Vuex.mapState({
            games: state => state.main.games,
            userId: state => state.user.id
        }),
        methods: {
            removeMyOffer() {
                Connection.send('removeGameOffer', {}, (err, data) => {
                    if (err) return;

                    this.$store.commit('initGamesList', data.games);
                });
            },
            isMyOffer(game) {
                return game.userId === this.userId;
            },
            isGameOfferCreated() {
                return this.games.findIndex(this.isMyOffer) !== -1;
            },
            createGame(moveType) {
                Connection.send('createGameOffer', {
                    type: 'test',
                    moveType
                }, (err, data) => {
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
            },
            startGame(game) {
                Connection.send('startGame', { userId: game.userId }, err => {
                    if (err) console.error('error starting game', err);
                });
            },
            clearIntervalGameOffersUpdating() {
                clearInterval(this.intervalGameOffersUpdating);
            }
        }
    };
</script>

<style lang="stylus">
tr.my
    background-color #0f0
</style>