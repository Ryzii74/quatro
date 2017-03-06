const SESSION_KEY = 'sessionHash';

module.exports = {
    saveSession(hash) {
        localStorage.setItem(SESSION_KEY, hash);
    },

    removeSession() {
        localStorage.removeItem(SESSION_KEY);
    },

    getSession() {
        return localStorage.getItem(SESSION_KEY);
    }
};