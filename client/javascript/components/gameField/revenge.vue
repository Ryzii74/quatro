<template lang="jade">
div
    div(
        @click="offerRevenge",
        v-if="(isGameEnded || !!winLine) && !revenge"
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
    const Connection = require('../../libs/connection');

    module.exports = {
        created() {
            Connection.subscribe('cancelRevenge', () => {
                this.$store.commit('revenge', null);
            });
            Connection.subscribe('offerRevenge', () => {
                this.$store.commit('revenge', 'get');
            });
        },
        computed: Vuex.mapState({
            isGameEnded: state => state.game.isGameEnded,
            winLine: state => state.game.winLine,
            revenge: state => state.game.revenge,
            opponent: state => state.game.players.find(
                    el => el !== state.user.id
                )
        }),
        methods: {
            offerRevenge() {
                Connection.send('offerRevenge', { userId: this.opponent }, err => {
                    if (err) {
                        console.error('error offering revenge', err);
                        return;
                    }

                    this.$store.commit('revenge', 'sent');
                });
            },
            cancelRevenge() {
                this.$store.commit('revenge', null);
                Connection.send('cancelRevenge', { userId: this.opponent }, err => {
                    if (err) console.error('error cancel revenge', err);
                });
            },
            acceptRevenge() {
                Connection.send('acceptRevenge', { userId: this.opponent }, err => {
                    if (err) console.error('error cancel revenge', err);
                });
            }
        }
    };
</script>