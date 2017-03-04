module.exports = {
    namespaced: true,
    state: {
        selectedMove: null
    },
    mutations: {
        selectMove(state, data) {
            state.selectedMove = data;
        },

        clearSelectedMove(state) {
            state.selectedMove = null;
        }
    }
};