var socket = io();
socket.connect('http://127.0.0.1:3000');

socket.on('connect',function() {
    console.log('Client has connected to the server!');
});

socket.emit('test', {}, console.log);