Vue.use(Vuex);

const Connection = require('./libs/connection');
const Router = require('./libs/router');
const store = require('./stores/index.js');

Connection.init(() => {
    const router = Router.init();
    const Auth = require('./libs/auth');

    new Vue({
        created() {

        },
        computed: Vuex.mapState({
            login(state) {
                return state.main.login;
            }
        }),
        methods: {
            logout() {
                Auth.logout(err => {
                    if (err) {
                        console.error('error logout', err);
                        return;
                    }

                    this.$store.commit('logout');
                });
            }
        },

        store,
        router
    }).$mount('#app');
});