module.exports = socket => {
    socket.on('auth', ({ login }, callback) => {
        socket.login = login;
        callback({
            success: true,
            data: {
                login
            }
        });
    });
};