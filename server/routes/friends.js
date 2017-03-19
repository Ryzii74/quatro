module.exports = socket => {
    socket.on('friendAct', (data, callback) => {
        const friendIndex = socket.user.friends.findIndex(el => el.userId.toString() === data.userId.toString());
        if (friendIndex) {
            socket.user.friends.push(data);
        } else {
            socket.user.friends.splice(friendIndex, 1);
        }

        socket.user.save(err => {
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