const MainPage = require('../components/mainPage.vue');
const GameField = require('../components/gameField/index.vue');
const Auth = require('../components/auth.vue');
const Profile = require('../components/profile/index.vue');

module.exports = {
    init() {
        const routes = [
            { path: '/', component: MainPage },
            { path: '/game', component: GameField },
            { path: '/auth', component: Auth },
            { path: '/profile', component: Profile },
            { path: '/profile/:id', component: Profile },
        ];

        return new VueRouter({
            // mode: 'history',
            routes, // сокращение от routes: routes
        });
    },
};
