const routes = [
    { path: '/', component: mainPage },
    { path: '/game', component: gameField }
];

const router = new VueRouter({
    mode: 'history',
    routes // сокращение от routes: routes
});

const app = new Vue({
    router
}).$mount('#app');