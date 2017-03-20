<template lang="jade">
    div#timers
        div#myTimer {{myTime}}
        div#opponentTimer {{opponentTime}}
</template>

<script>
    module.exports = {
        computed: Vuex.mapState({
            myTime: state => state.game.gameTime.start,
            opponentTime: state => state.game.gameTime.start
        })
    };
</script>