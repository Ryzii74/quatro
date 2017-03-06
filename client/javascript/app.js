Vue.use(Vuex);

const Connection = require('./libs/connection');
const Router = require('./libs/router');
const store = require('./stores/index.js');

Connection.init(() => {
    const router = Router.init();
    const Auth = require('./libs/auth');
    const Session = require('./libs/session');

    new Vue({
        created() {
            const currentSession = Session.getSession();
            if (!currentSession) return;

            Auth.login({
                hash: currentSession
            }, (err, data) => {
                if (err) {
                    console.error('error login with current session', err);
                    console.error(currentSession);
                    return;
                }
                this.$store.commit('login', data.login);
            });
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