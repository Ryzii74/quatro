module.exports = {
    namespaced: true,

    state: {
        games: []
    },

    mutations: {
        initGamesList(state, games) {
            state.games = games;
        }
    }
};