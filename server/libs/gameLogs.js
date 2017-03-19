const GameLog = require('../models/gameLogs');
const User = require('../models/user');

const LOGS_COLLECTION = 'logs';

function getOpponent(userId, log) {
    return log.players.find(player => player !== userId);
}

module.exports = {
    get(userId, skip, callback) {
        GameLog
            .find({
                players: userId
            })
            .limit(20)
            .skip(skip || 0)
            .exec((err, logs) => {
                if (err) return callback(err);

                User.getMany(logs.map(log => getOpponent(userId, log)), (err, players) => {
                    if (err) return callback(err);

                    logs.forEach(log => {
                        const player = players.find(player => player._id.toString() === getOpponent(userId, log));
                        log.opponent = player;
                    });
                    callback(null, logs);
                });
            });
    },

    save(data) {
        const log = new GameLog(data);
        log.save(err => {
            if (err) console.error('error saving log', err);
        });
    }
};