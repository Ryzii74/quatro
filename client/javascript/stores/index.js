const game = require('./game');
const main = require('./main');

module.exports = new Vuex.Store({
    modules: {
        game,
        main
    }
});