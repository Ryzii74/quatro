const SocketsOnline = require('./socketsOnline');
const Router = require('../router');
const GamesOfferManager = require('./gamesOfferManager');
const socketIo = require('socket.io');

let io = null;

module.exports.init = (server, callback) => {
    io = socketIO(server);

    io.on('connection', socket => {
        socket.on('disconnect', () => {
            SocketsOnline.dec();

            if (socket.user) GamesOfferManager.remove(socket.user.id);
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

module.exports.send = (user, method, data) => {
    io.to(user).emit(method, data);
};
