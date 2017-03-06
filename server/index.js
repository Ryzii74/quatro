const async = require('async');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Db = require('./libs/db');
const Config = require('../config');

const SocketsOnline = require('./libs/socketsOnline');
const Router = require('./router');
Router.init();

server.listen(3000);
app.use(express.static('client'));

async.series([
    callback => Db.init(Config.db, callback),
    callback => {
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
    }
], err => {
    if (!err) return;

    console.log(err);
    process.exit(0);
});
