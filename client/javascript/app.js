const Connection = require('./libs/connection');
const Router = require('./libs/router');

Connection.init(() => {
    Router.init();
});