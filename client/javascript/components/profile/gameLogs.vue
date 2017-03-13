<template lang="jade">
    div#gameLogs
        h1 GameLogs
        p(v-for="log in gameLogs") {{log.winner === userId ? 'Win' : 'Lose'}} against {{log.opponent}}
</template>

<script>
    const Connection = require('../../libs/connection');

    module.exports = {
        data() {
            return {
                gameLogs: []
            };
        },
        computed: Vuex.mapState({
            userId: state => state.user.id
        }),
        created() {
            Connection.send('getGameLogs', {}, (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }

                this.gameLogs = data.logs;
            });
        }
    };
</script>

<style lang="stylus" scoped>
</style>