<template lang="jade">
    div#gameLogs
        p GameLogs
</template>

<script>
    const Connection = require('../../libs/connection');

    module.exports = {
        data() {
            return {
                gameLogs: []
            };
        },
        created() {
            Connection.send('getGameLogs', {}, (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }

                this.gameLogs = data.logs;
            });
        }
    };
</script>

<style lang="stylus" scoped>
</style>