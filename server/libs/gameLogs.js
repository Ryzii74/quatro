const Db = require('./db');
const PlayersManager = require('./playersManager');

const LOGS_COLLECTION = 'logs';

function getOpponent(userId, log) {
    return log.players.find(player => player !== userId);
}

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

                PlayersManager.getMany(logs.map(log => getOpponent(userId, log)), (err, players) => {
                    if (err) return callback(err);

                    logs.forEach(log => {
                        const player = players.find(player => player._id.toString() === getOpponent(userId, log));
                        log.opponent = player;
                    });
                    callback(null, logs);
                });
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