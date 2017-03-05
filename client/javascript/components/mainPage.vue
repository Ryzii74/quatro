<template lang="jade">
div
    h1 Привет
    h2 Количество игр {{games.length}}
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
        },
        computed: Vuex.mapState({
            games(state) {
                return state.main.games;
            }
        })
    };
</script>

<style lang="stylus" scoped>
h1
    color #f00

</style>