<template lang="jade">
    div#gameLogs
        h1 GameLogs
        p(v-for="log in logs")
            | {{log.winner === userId ? 'Win' : 'Lose'}} against
            a(:href="'#/profile/' + log.opponent._id") {{log.opponent.login}}
</template>

<script>
    module.exports = {
        props: [ 'logs', 'userId' ]
    };
</script>

<style lang="stylus" scoped>
</style>