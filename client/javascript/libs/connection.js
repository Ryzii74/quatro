const APP = {};

class Connection {
    constructor() {
        this.socket = io();
        this.socket.connect('http://127.0.0.1:3000');
    }

    init(callback) {
        this.socket.on('connect', callback);
    }

    send(method, data, callback) {
        this.socket.emit(method, data, result => {
            if (result.success) {
                callback(null, result.data);
            } else {
                console.error(result.error);
                callback(result.error);
            }
        });
    }
}

APP.Connection = new Connection();