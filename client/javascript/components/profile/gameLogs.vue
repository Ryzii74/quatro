<template lang="jade">
    div#gameLogs
        h1 GameLogs
        p(v-for="log in gameLogs")
            | {{log.winner === userId ? 'Win' : 'Lose'}} against
            a(:href="'#/profile/' + log.opponent._id") {{log.opponent.login}}
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
        watch: {
            '$route': 'fetchData'
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                Connection.send('getGameLogs', { userId: this.$route.params.id }, (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    this.gameLogs = data.logs;
                });
            }
        }
    };
</script>

<style lang="stylus" scoped>
</style>