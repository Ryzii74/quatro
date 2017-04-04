<template lang="jade">
table
    tr(
        v-for="game, index in games",
        :class="isMyOffer(game) ? 'my' : ''"
    )
        td {{index + 1}}
        td {{game.login}}
        td {{game.moveType}}
        td(
            @click="removeMyOffer()",
            v-if="isMyOffer(game)"
        ) Remove
        td(
            @click="startGame(game)",
            v-if="!isMyOffer(game)"
        ) Join
</template>

<script>
    const Connection = require('../../libs/connection');

    module.exports = {
        props: ['games', 'removeMyOffer'],
        computed: Vuex.mapState({
            userId: state => state.user.id,
        }),
        methods: {
            isMyOffer(game) {
                return game.userId === this.userId;
            },
            startGame(game) {
                Connection.send('startGame', { userId: game.userId }, err => {
                    if (err) console.error('error starting game', err);
                });
            },
        },
    };
</script>
