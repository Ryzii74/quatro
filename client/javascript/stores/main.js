module.exports = {
    namespaced: true,

    state: {
        games: [],
        playersOnline: 0,
    },

    mutations: {
        setPlayersOnline(state, count) {
            state.playersOnline = count;
        },
    },
};
