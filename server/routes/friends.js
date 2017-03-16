const PlayersManager = require('../libs/playersManager');

module.exports = socket => {
    socket.on('friendAct', (data, callback) => {
        const friendIndex = socket.user.friends.findIndex(el => el.id === data.userId);
        if (friendIndex) {
            socket.user.friends.push(data);
        } else {
            socket.user.friends.splice(friendIndex, 1);
        }

        PlayersManager.updateFriends(socket.user.id, socket.user.friends, err => {
            if (err) return callback({
                success: false,
                error: "error saving friends change"
            });

            callback({
                success: true
            });
        });
    });
};