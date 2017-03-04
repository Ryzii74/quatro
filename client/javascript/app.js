Vue.use(Vuex);

const Connection = require('./libs/connection');
const Router = require('./libs/router');
const store = require('./stores/index.js');

Connection.init(() => {
    const router = Router.init();

    new Vue({
        store,
        router
    }).$mount('#app');
});