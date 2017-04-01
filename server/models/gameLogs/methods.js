const User = require('../user');
const Schema = require('./schema');

function getOpponent(userId, log) {
    return log.players.find(player => player.toString() !== userId);
}

function getGameLog(userId, skip, callback) {
    this.find({
        players: userId,
    })
        .limit(20)
        .skip(skip || 0)
        .exec((err, logs) => {
            if (err) {
                callback(err);
                return;
            }

            User.getMany(logs.map(log => getOpponent(userId, log)), (err, players) => {
                if (err) {
                    callback(err);
                    return;
                }

                logs.map(log => {
                    const logObj = log.toObject();
                    const player = players.find(
                        player => player._id.toString() === getOpponent(userId, log).toString()
                    );
                    log.opponent = player;
                    return logObj;
                });
                callback(null, logs);
            });
        });
}
Schema.statics.get = getGameLog;
