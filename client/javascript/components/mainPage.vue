<template lang="jade">
div
    h1 Привет
    h2 Количество игроков {{playersOnline}}

    gameOffers(ref="gameOffers")
</template>

<script>
    const Connection = require('../libs/connection');
    const gameOffers = require('./gameOffers.vue');

    module.exports = {
        components: {
            gameOffers
        },
        created() {
            Connection.subscribe('socketsOnline', data => {
                this.$store.commit('setPlayersOnline', data.count);
            });
        },
        computed: Vuex.mapState({
            playersOnline: state => state.main.playersOnline
        }),
        beforeRouteLeave(to, from, next) {
            this.$refs.gameOffers.clearIntervalGameOffersUpdating();
            next();
        }
    };
</script>

<style lang="stylus" scoped>
h1
    color #f00

</style>