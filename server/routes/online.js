'use strict';

const SocketsOnline = require('../libs/socketsOnline')

module.exports = socket => {
    socket.on('getOnline', (data, callback) => {
        callback(SocketsOnline.get());
    });
};