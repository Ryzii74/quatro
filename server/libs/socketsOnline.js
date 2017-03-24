let sockets = 0;

module.exports = {
    inc() {
        sockets++;
    },

    dec() {
        sockets--;
    },

    get() {
        return {
            success: true,
            data: {
                count: sockets,
            },
        };
    },
};
