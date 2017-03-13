<template lang="jade">
    div#chat
        p(v-for="message in messages") {{message.login}}: {{message.text}}
        input(
            v-model="message",
            placeholder="Введите сообщение",
            @keyup.enter="sendMessage"
        )
</template>

<script>
    const Connection = require('../../libs/connection');

    module.exports = {
        created() {
            Connection.subscribe('newGameMessage', (err, message) => {
                if (err) {
                    console.error('get message error', err);
                    return;
                }
                if (message.userId !== this.opponent) return;

                this.$store.commit('addMessage', message);
            });
        },
        computed: Vuex.mapState({
            messages: state => state.game.messages,
            opponent: state => state.game.players.find(
                    el => el !== state.user.id
                ),
            me: state => state.user.login
        }),
        data() {
            return {
                message: ''
            }
        },
        methods: {
            sendMessage() {
                this.$store.commit('addMessage', {
                    login: this.me,
                    text: this.message
                });
                Connection.send('gameMessage', {
                    text: this.message,
                    to: this.opponent
                }, err => {
                    if (err) console.error('error sending message', err);
                });

                this.message = '';
            }
        }
    };
</script>