const Mongoose = require('mongoose');
const Schema = require('./schema');

require('./methods');

module.exports = Mongoose.model('GameLog', Schema);