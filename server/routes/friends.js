module.exports = socket => {
    socket.on('friendAct', (data, callback) => {
        callback({
            success: true
        });
    });
};