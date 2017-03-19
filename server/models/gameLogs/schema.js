const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

require('./methods');

module.exports = new Schema({
    date: { type: Date, default: Date.now },
    players: [ Schema.Types.ObjectId ],
    field: {
        type: Schema.Types.Mixed,
        required: true
    },
    winner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    opponent: {
        _id: Schema.Types.ObjectId,
        login: String
    }
});
