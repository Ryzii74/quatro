<template lang="jade">
div
    div(
        @click="offerRevenge",
        v-if="isGameEnded || !!winLine"
    ) Реванш
    div(
        @click="cancelRevenge",
        v-if="revenge === 'sent'"
    ) Отменить реванш
    div(
        @click="acceptRevenge",
        v-if="revenge === 'get'"
    ) Принять реванш
</template>

<script>


    module.exports = {
        created: 
        computed: Vuex.mapState({
            revenge: state => state.game.revenge
        }),
        methods: {
            offerRevenge() {
                Connection.send('offerRevenge', {}, err => {
                    if (err) {
                        console.error('error offering revenge', err);
                        return;
                    }

                    this.$store.commit('revenge', 'sent');
                });
            },
            cancelRevenge() {
                this.$store.commit('revenge', null);
                Connection.send('cancelRevenge', {}, err => {
                    if (err) {
                        console.error('error cancel revenge', err);
                        return;
                    }
                });
            },
            acceptRevenge() {
                Connection.send('acceptRevenge', {}, err => {
                    if (err) {
                        console.error('error cancel revenge', err);
                        return;
                    }
                });
            }
        }
    };
</script>