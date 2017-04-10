<template lang="jade">
div
    h1 Привет
    h2 Количество игроков {{playersOnline}}

    gameOffers(ref="gameOffers")
</template>

<script>
    const Connection = require('../libs/connection');
    const gameOffers = require('./gameOffers/gameOffers.vue');

    module.exports = {
        components: {
            gameOffers
        },
        created() {
            Connection.send('getOnline', {}, (err, { count }) => {
                if (err) {
                    console.error('error getting start online count', err);
                    return;
                }

                this.playersOnline = count;
            });
            Connection.subscribe('socketsOnline', ({ count }) => {
                this.playersOnline = count;
            });
        },
        data() {
            return {
                playersOnline: 0,
            };
        },
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