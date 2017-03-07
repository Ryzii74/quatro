const game = require('./game');
const main = require('./main');
const user = require('./user');

module.exports = new Vuex.Store({
    modules: {
        game,
        main,
        user
    }
});