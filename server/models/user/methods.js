const Schema = require('./schema');

function getManyUsers(ids, callback) {
    this.find({
        _id: {
            $in: ids,
        },
    })
        .select({
            login: 1,
        })
        .exec(callback);
}
Schema.statics.getMany = getManyUsers;

function getOneUser(id, projection, callback) {
    this.findOne({
        _id: id,
    })
        .select(projection)
        .exec(callback);
}
Schema.statics.getOne = getOneUser;
