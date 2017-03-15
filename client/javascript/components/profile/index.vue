<template lang="jade">
    div#profile
        h1 Profile
        gameLogs(
            :logs="profile.logs",
            :userId="profile.userId"
        )
        addToFriends(
            v-if="profile.userId !== myId",
            :isInFriends="isInFriends"
        )
</template>

<script>
    const Connection = require('../../libs/connection');
    const gameLogs = require('./gameLogs.vue');
    const addToFriends = require('./addToFriends.vue');

    module.exports = {
        components: {
            gameLogs,
            addToFriends
        },
        data() {
            return {
                profile: {
                    logs: [],
                    userId: '',
                    friends: []
                }
            };
        },
        computed: Vuex.mapState({
            myId: state => state.user.id
        }),
        watch: {
            $route: 'getPlayerData'
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
            },
            isInFriends() {
                return true;
            }
        }
    };
</script>

<style lang="stylus" scoped>
</style>