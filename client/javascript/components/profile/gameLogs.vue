<template lang="jade">
    div#gameLogs
        h1 GameLogs
        div(v-for="log in logs")
            | {{log.winner === userId ? 'Win' : 'Lose'}} against
            a(:href="'#/profile/' + log.opponent._id") {{log.opponent.login}}
            div#gameField
                gameField(:field="log.field")
</template>

<script>
    const gameField = require('../gameField/field.vue');

    module.exports = {
        props: [
            'logs',
            'userId',
        ],
        components: {
            gameField,
        },
    };
</script>

<style lang="stylus" scoped>
</style>
