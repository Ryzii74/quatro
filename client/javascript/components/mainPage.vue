<template lang="jade">
div
    h1 Привет
    h2 Количество игроков {{playersOnline}}

    gameOffers
</template>

<script>
    const Connection = require('../libs/connection');
    const gameOffers = require('./gameOffers.vue');

    module.exports = {
        components: {
            gameOffers
        },
        created() {
            Connection.subscribe('socketsOnline', (err, data) => {
                this.$store.commit('setPlayersOnline', data.count);
            });
        },
        computed: Vuex.mapState({
            playersOnline(state) {
                return state.main.playersOnline;
            }
        })
    };
</script>

<style lang="stylus" scoped>
h1
    color #f00

</style>