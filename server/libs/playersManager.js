const Db = require('../libs/db');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    getMany(ids, callback) {
        Db.get()
            .collection('users')
            .find(
                {
                    _id: {
                        $in: ids.map(ObjectId)
                    }
                }, {
                    login: 1
                }
            )
            .toArray(callback)
    },

    getOne(id, projection, callback) {
        Db.get()
            .collection('users')
            .findOne(
                {
                    _id: ObjectId(id)
                },
                projection,
                callback
            );
    },

    updateFriends(userId, friends, callback) {
        Db.get()
            .collection('users')
            .updateOne(
            {
                _id: ObjectId(userId)
            }, {
                $set: {
                    friends: friends
                }
            },
            callback
        );
    }
};