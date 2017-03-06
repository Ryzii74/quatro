const MainPage = require('../components/mainPage.vue');
const GameField = require('../components/gameField/index.vue');
const Auth = require('../components/auth.vue');

module.exports = {
    init() {
        const routes = [
            { path: '/', component: MainPage },
            { path: '/game', component: GameField },
            { path: '/auth', component: Auth }
        ];

        return new VueRouter({
            // mode: 'history',
            routes // сокращение от routes: routes
        });
    }
};