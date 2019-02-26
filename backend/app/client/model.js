const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Client', Schema);
