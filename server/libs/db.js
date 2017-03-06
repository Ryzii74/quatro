const MongoClient = require('mongodb').MongoClient;

let db = null;

module.exports.init = (config, callback) => {
    MongoClient.connect(config.url, (err, instance) => {
        if (err) return callback(err);

        db = instance;
        callback();
    });
};

module.exports.get = () => db;