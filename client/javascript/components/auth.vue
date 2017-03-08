<template lang="jade">
div#auth
    input(v-model="login", placeholder="Login")
    input(type="password", v-model="password", placeholder="Password")
    button(v-on:click.preventSubmit="logIn()") LogIn
    button(v-on:click.preventSubmit="signUp()") SignUp
</template>

<script>
    const Auth = require('../libs/auth');

    module.exports = {
        data() {
            return {
                login: null,
                password: null
            };
        },

        methods: {
            logIn() {
                Auth.login({
                    login: this.login,
                    password: this.password
                }, err => {
                    if (err) {
                        console.error('error login', err);
                        return;
                    }

                    this.response();
                });
            },
            signUp() {
                Auth.signup({
                    login: this.login,
                    password: this.password
                }, err => {
                    if (err) {
                        console.error('error signup', err);
                        return;
                    }

                    this.response();
                });
            },
            response(data) {
                this.$router.push('/');
            }
        }
    };
</script>