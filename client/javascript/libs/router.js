const MainPage = require('../components/mainPage.vue');
const GameField = require('../components/gameField/index.vue');

module.exports = {
    init() {
        const routes = [
            { path: '/', component: MainPage },
            { path: '/game', component: GameField }
        ];

        return new VueRouter({
            // mode: 'history',
            routes // сокращение от routes: routes
        });
    }
};