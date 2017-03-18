<template lang="jade">
    div#friends
        h2 Friends
        p(v-for="friend in friends")
            a(:href="'#/profile/' + friend.userId") {{friend.login}}
</template>

<script>
    module.exports = {
        props: ['friends']
    };
</script>