const Mongoose = require('mongoose');

let db = null;

module.exports.init = (config, callback) => {
    db = Mongoose.connect(config.url);
    db.on('error', err => {
        console.error('error connecting mongodb');
        callback(err);
    });
    db.once('open', callback);
};

module.exports.get = () => db;