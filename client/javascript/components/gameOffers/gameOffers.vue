<template lang="jade">
div#gameOffers
    offersList(
        :games="games",
        :removeMyOffer="removeMyOffer"
    )
    template(v-if="!isGameOfferCreated()")
        a(
            href="#",
            @click.prevent="createGame('none')"
        ) Создать игру
        a(
            href="#",
            @click.prevent="createGame('first')"
        ) Создать игру с первым ходом
        a(
            href="#",
            @click.prevent="createGame('second')"
        ) Создать игру со вторым ходом
</template>

<script>
    const Connection = require('../../libs/connection');
    const Config = require('../../config');
    const offersList = require('./list.vue');

    module.exports = {
        components: {
            offersList,
        },
        created() {
            this.getGames();
            const timeout = Config.intervalUpdatingGameOffersList;
            this.intervalGameOffersUpdating = setInterval(this.getGames.bind(this), timeout);

            Connection.subscribe('startGame', data => {
                this.$store.commit('startGame', data);
                this.$router.push('/game');
            });
        },
        computed: Vuex.mapState({
            userId: state => state.user.id,
        }),
        data() {
            return {
                games: [],
            };
        },
        methods: {
            removeMyOffer() {
                Connection.send('removeGameOffer', {}, (err, { games }) => {
                    if (err) {
                        console.error('error getting games list', err);
                        return;
                    }
                    this.games = games;
                });
            },
            isGameOfferCreated() {
                return this.games.findIndex(this.isMyOffer) !== -1;
            },
            createGame(moveType) {
                Connection.send('createGameOffer', {
                    type: 'test',
                    moveType,
                }, (err, data) => {
                    if (err) {
                        console.error('error creating game', err);
                        return;
                    }

                    this.games = data.games;
                });
            },
            getGames() {
                Connection.send('getGameOffers', { type: 'test' }, (err, { games }) => {
                    if (err) {
                        console.error('error getting games list', err);
                        return;
                    }

                    this.games = games;
                });
            },
            clearIntervalGameOffersUpdating() {
                clearInterval(this.intervalGameOffersUpdating);
            },
        },
    };
</script>

<style lang="stylus">
tr.my
    background-color #0f0
</style>
