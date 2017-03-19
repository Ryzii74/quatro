const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

module.exports = new Schema({
    login: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friends: [{
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        login: {
            type: String,
            required: true
        }
    }]
});
