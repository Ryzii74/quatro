module.exports = {
    namespaced: true,

    state: {
        games: [],
        playersOnline: 0,
        login: null
    },

    mutations: {
        initGamesList(state, games) {
            state.games = games;
        },

        setPlayersOnline(state, count) {
            state.playersOnline = count;
        },

        login(state, login) {
            state.login = login;
        },

        logout(state) {
            state.login = null;
        }
    }
};