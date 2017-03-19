const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

require('./methods');

module.exports = new Schema({
    name: {
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
    friends: [ Schema.Types.ObjectId ]
});
