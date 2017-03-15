<template lang="jade">
    p(@click="act") {{getMessage()}}
</template>

<script>
    const Connection = require('../../libs/connection');

    module.exports = {
        props: [ 'isInFriends', 'userId' ],
        data() {
            return {
                isInFriendsCache: this.isInFriends
            };
        },
        methods: {
            getMessage() {
                return this.isInFriendsCache ? 'Remove from friends' : 'Add to friends';
            },
            act() {
                Connection.send('friendAct', { userId: this.userId }, (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    this.isInFriendsCache = !this.isInFriendsCache;
                });
            }
        }
    };
</script>