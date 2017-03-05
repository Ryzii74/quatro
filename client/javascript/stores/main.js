module.exports = {
    namespaced: true,

    state: {
        games: null
    },

    mutations: {
        initGamesList(state, games) {
            state.games = games;
        }
    }
};