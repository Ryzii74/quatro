<template lang="jade">
    div#chat
        p(v-for="message in messages")
            message(:login="message.login", :text="message.text")
        addMessageForm(:sendMessage="sendMessage")
</template>

<script>
    const Connection = require('../../libs/connection');
    const addMessageForm = require('./addMessageForm.vue');
    const message = require('./message.vue');

    module.exports = {
        components: {
            addMessageForm,
            message,
        },
        created() {
            Connection.subscribe('newGameMessage', message => {
                if (message.userId !== this.opponent) return;
                this.addMessage(message);
            });
        },
        computed: Vuex.mapState({
            opponent: state => state.game.players.find(el => el !== state.user.id),
            me: state => state.user.login,
        }),
        data() {
            return { messages: [] };
        },
        methods: {
            sendMessage(text) {
                console.log(text);
                this.addMessage({
                    login: this.me,
                    text,
                });
                console.log(this.messages);
                Connection.send('gameMessage', {
                    text,
                    to: this.opponent,
                }, err => {
                    if (err) console.error('error sending message', err);
                });
            },

            addMessage(message) {
                this.messages.push(message);
            },
        },
    };
</script>
