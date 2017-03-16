<template lang="jade">
    div#friends
        h2 Friends
        p(v-for="friend in friends") {{friend.login}}
</template>

<script>
    module.exports = {
        props: ['friends']
    };
</script>