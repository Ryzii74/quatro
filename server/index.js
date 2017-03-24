const async = require('async');

const Config = require('../config');
const Db = require('./libs/db');
const Router = require('./router');
const SocketServer = require('./libs/socketServer');
const ExpressServer = require('./libs/expressServer');

async.waterfall([
    Router.init,
    callback => Db.init(Config.db, callback),
    callback => ExpressServer.init(Config.httpServer, callback),
    (server, callback) => SocketServer.init(server, callback),
], err => {
    if (!err) return;

    console.log(err);
    process.exit(0);
});
