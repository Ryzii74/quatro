module.exports = {
    namespaced: true,

    state: {
        games: [],
        playersOnline: 0,
    },

    mutations: {
        initGamesList(state, games) {
            state.games = games;
        },

        setPlayersOnline(state, count) {
            state.playersOnline = count;
        },
    },
};
