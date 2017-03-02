const MainPage = require('../components/mainPage');
const GameField = require('../components/gameField');

module.exports = {
    init() {
        const routes = [
            { path: '/', component: MainPage },
            { path: '/game', component: GameField }
        ];

        const router = new VueRouter({
            mode: 'history',
            routes // сокращение от routes: routes
        });

        new Vue({
            router
        }).$mount('#app');
    }
};