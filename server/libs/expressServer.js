const Express = require('express');
const Http = require('http');

module.exports.init = (config, callback) => {
    const app = Express();
    const server = Http.createServer(app);

    app.use(Express.static('client'));
    server.listen(config.port, 'localhost', (err) => {
        callback(err, server);
    });
};
