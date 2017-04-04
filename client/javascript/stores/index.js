const game = require('./game');
const user = require('./user');

module.exports = new Vuex.Store({
    modules: {
        game,
        user,
    },
});
