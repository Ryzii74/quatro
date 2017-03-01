const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const Router = require('./router');
Router.init();

io.on('connection', socket => {
    Router.initSocketMethods(socket);
});
server.listen(3000);

app.use(express.static('client'));