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
            .toArray((err, logs) => {
                if (err) return callback(err);

                //TODO: смапить имена игроков
                callback(null, logs);
            });
    },

    save(log) {
        log.date = +new Date();

        Db.get()
            .collection(LOGS_COLLECTION)
            .insertOne(log, err => {
                if (err) console.error('error saving log', err);
            });
    }
};