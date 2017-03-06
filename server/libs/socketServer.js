const SocketsOnline = require('./socketsOnline');
const Router = require('../router');

module.exports.init = (server, callback) => {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        socket.on('disconnect', () => {
            SocketsOnline.dec();
            socket.broadcast.emit('socketsOnline', SocketsOnline.get());
        });
        Router.initSocketMethods(socket);

        process.nextTick(() => {
            SocketsOnline.inc();
            socket.broadcast.emit('socketsOnline', SocketsOnline.get());
        });
    });

    callback();
};