<template lang="jade">
div
    h1 Привет
    h2 Количество игр {{games.length}}
    h2 Количество игроков {{playersOnline}}
    h2 Вы авторизованы как {{login}}

    a(href="#", v-on:click.prevent="createGame()") Создать игру
</template>

<script>
    const Connection = require('../libs/connection');

    module.exports = {
        created() {
            Connection.send('getGameOffers', {}, (err, data) => {
                if (err) {
                    console.error('error getting games list', err);
                    return;
                }

                this.$store.commit('initGamesList', data.games);
            });

            Connection.send('auth', { login: 'test' }, (err, data) => {
                if (err) {
                    console.error('error getting games list', err);
                    return;
                }

                this.$store.commit('login', data.login);
            });

            Connection.subscribe('socketsOnline', (err, data) => {
                this.$store.commit('setPlayersOnline', data.count);
            });
        },
        computed: Vuex.mapState({
            games(state) {
                return state.main.games;
            },
            playersOnline(state) {
                return state.main.playersOnline;
            },
            login(state) {
                return state.main.login;
            }
        }),
        methods: {
            createGame() {
                Connection.send('createGameOffer', { type: 'test' }, (err, data) => {
                    if (err) {
                        console.error('error creating game', err);
                        return;
                    }

                    this.$store.commit('initGamesList', data.games);
                });
            }
        }
    };
</script>

<style lang="stylus" scoped>
h1
    color #f00

</style>