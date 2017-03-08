const Db = require('./db');

const LOGS_COLLECTION = 'logs';

module.exports = {
    get(userId, skip, callback) {
        Db.get()
            .collection(LOGS_COLLECTION)
            .find({
                players: userId
            })
            .limit(20)
            .skip(skip || 0)
            .toArray(callback);
    },

    save(log) {
        Db.get()
            .insertOne(log, callback)
    }
};