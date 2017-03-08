<template lang="jade">
    div#profile
        h1 Profile
        gameLogs
</template>

<script>
    const gameLogs = require('./gameLogs.vue');

    module.exports = {
        components: {
            gameLogs
        }
    };
</script>

<style lang="stylus" scoped>
</style>