const revenges = {};
const REVENGE_TIME = 6000000;

module.exports = {
    add(from, to) {
        const timeout = setTimeout(() => {
            this.remove(from);
        });
        revenges[from] = {
            to: to,
            timeout
        };
    },

    remove(from) {
        const revenge = revenges[from];
        if (!revenge) return;

        if (revenge.timeout) clearTimeout(revenge.timeout);
        delete revenges[from];
    }
};