const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  nome: String
});

const deepPopulate = require('mongoose-deep-populate')(mongoose);

Schema.plugin(deepPopulate, {});

module.exports = mongoose.model('Cliente', Schema);
