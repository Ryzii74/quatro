module.exports = socket => {
    socket.on('test', (data, callback) => {
        callback({ success: true });
    });
};