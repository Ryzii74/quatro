const Schema = require('./schema');

Schema.methods.getMany = (ids, callback) => {
    this.model('User')
        .find({
            _id: {
                $in: ids
            }
        })
        .select({
            login: 1
        })
        .exec(callback);
};

Schema.methods.getOne = (id, projection, callback) => {
    this.model('User')
        .findOne({
            _id: id
        })
        .select(projection)
        .exec(callback);
};