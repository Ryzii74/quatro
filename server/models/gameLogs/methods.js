const User = require('../user');
const Schema = require('./schema');

function opponent(userId, log) {
    return log.players.find(player => player.toString() !== userId).toString();
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

            User.getMany(logs.map(log => opponent(userId, log)), (err, players) => {
                if (err) {
                    callback(err);
                    return;
                }

                logs.map(log => {
                    const logObj = log.toObject();
                    log.opponent = players.find(el => el._id.toString() === opponent(userId, log));
                    return logObj;
                });
                callback(null, logs);
            });
        });
}
Schema.statics.get = getGameLog;
