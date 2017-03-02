const Games = [];

module.exports.get = (callback) => {
    return callback(Games);
};

module.exports.add = (gameData) => {
    Games.push(gameData);
};

module.exports.remove = (gameAuthor) => {
    var gameIndex = Games.findIndex(game => game.author === gameAuthor);
    if (gameIndex === -1) return;

    Games.splice(gameIndex, 1);
};