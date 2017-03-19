const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

require('./methods');

module.exports = new Schema({
    date: { type: Date, default: Date.now },
    players: [ Schema.Types.ObjectId ],
    fields: Schema.Types.Mixed,
    winner: Schema.Types.ObjectId
});
