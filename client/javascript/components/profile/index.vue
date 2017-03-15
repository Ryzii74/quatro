<template lang="jade">
    div#profile
        h1 Profile
        gameLogs(
            :logs="profile.logs",
            :userId="profile.userId"
        )
</template>

<script>
    const Connection = require('../../libs/connection');
    const gameLogs = require('./gameLogs.vue');

    module.exports = {
        components: {
            gameLogs
        },
        data() {
            return {
                profile: {
                    logs: [],
                    userId: ''
                }
            };
        },
        watch: {
            '$route': 'getPlayerData'
        },
        created() {
            this.getPlayerData();
        },
        methods: {
            getPlayerData() {
                Connection.send('getPlayerProfile', { userId: this.$route.params.id }, (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    this.profile = data;
                });
            }
        }
    };
</script>

<style lang="stylus" scoped>
</style>