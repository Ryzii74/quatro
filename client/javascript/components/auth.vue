<template lang="jade">
div#auth
    input(v-model="login", placeholder="Login")
    input(type="password", v-model="password", placeholder="Password")
    button(v-on:click.preventSubmit="logIn()") LogIn
    button(v-on:click.preventSubmit="signUp()") SignUp
</template>

<script>
    const Connection = require('../libs/connection');

    module.exports = {
        data() {
            return {
                login: null,
                password: null
            };
        },

        methods: {
            logIn() {
                Connection.send('login', {
                    login: this.login,
                    password: this.password
                }, (err, data) => {
                    console.log(err, data);
                });
            },
            signUp() {
                Connection.send('signup', {
                    login: this.login,
                    password: this.password
                }, (err, data) => {
                    console.log(err, data);
                });
            }
        }
    };
</script>