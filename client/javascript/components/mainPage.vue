<template lang="jade">
h1 Привет
</template>

<script>
    const Connection = require('../libs/connection');

    module.exports = {
        created() {
            Connection.send('getGameOffers', {}, (err, data) => {
                console.log(data);
            });
        }
    };
</script>

<style lang="stylus" scoped>
h1
    color #f00

</style>