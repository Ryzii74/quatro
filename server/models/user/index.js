const Mongoose = require('mongoose');
const Schema = require('./schema');

module.exports = Mongoose.model('User', Schema);