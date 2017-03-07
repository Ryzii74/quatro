module.exports = {
    namespaced: true,

    state: {
        id: null,
        login: null
    },

    mutations: {
        login(state, data) {
            state.login = data.login;
            state.id = data.id;
        },

        logout(state) {
            state.login = null;
            state.id = null;
        }
    }
};