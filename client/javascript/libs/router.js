const MainPage = require('../components/mainPage.vue');
const GameField = require('../components/gameField/index.vue');
const store = require('../stores/index.js');

module.exports = {
    init() {
        const routes = [
            { path: '/', component: MainPage },
            { path: '/game', component: GameField }
        ];

        const router = new VueRouter({
            //mode: 'history',
            routes // сокращение от routes: routes
        });

        new Vue({
            store,
            router
        }).$mount('#app');
    }
};