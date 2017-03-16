<template lang="jade">
    div#profile
        h1 Profile
        gameLogs(
            :logs="profile.logs",
            :userId="profile.userId"
        )
        addToFriends(
            v-if="profile.userId !== myId",
            :isInFriends="profile.isInFriends",
            :userId="profile.userId",
            :login="profile.login"
        )
        friends(
            v-if="profile.userId === myId",
            :friends="profile.friends"
        )
</template>

<script>
    const Connection = require('../../libs/connection');
    const gameLogs = require('./gameLogs.vue');
    const addToFriends = require('./addToFriends.vue');
    const friends = require('./friends.vue');

    module.exports = {
        components: {
            gameLogs,
            addToFriends,
            friends
        },
        data() {
            return {
                profile: {
                    logs: [],
                    userId: '',
                    friends: [],
                    isInFriends: false
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
            }
        }
    };
</script>

<style lang="stylus" scoped>
</style>