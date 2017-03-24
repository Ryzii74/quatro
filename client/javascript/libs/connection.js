function innerMessageHandler(callback) {
    return result => {
        console.log(result);
        if (result.success) {
            callback(null, result.data);
        } else {
            console.error(result.error);
            if (!breakOnError) callback(result.error);
        }
    };
}

function innerMessageHandlerWithoutErrors(callback) {
    return result => {
        if (!result.success) {
            console.error(result.error);
            return;
        }

        callback(result.data);
    };
}

class Connection {
    constructor() {
        this.socket = io();
        this.socket.connect('http://127.0.0.1:3000');
    }

    init(callback) {
        this.socket.on('connect', callback);
    }

    send(method, data, callback) {
        this.socket.emit(method, data, innerMessageHandler(callback));
    }

    subscribe(method, callback) {
        this.socket.on(method, innerMessageHandlerWithoutErrors(callback));
    }
}

module.exports = new Connection();
