const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema({
  nome: String,
  numero: Number,
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario'
  },
  cliente: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cliente'
  },
  envioAvulso: {
    type: Boolean,
    default: false
  },
  data: Date
});

const deepPopulate = require('mongoose-deep-populate')(mongoose);

Schema.plugin(deepPopulate, {});

// autoIncrement.initialize(mongoose.connection);
// Schema.plugin(autoIncrement.plugin, { model: 'Campanha', field: 'numero' });

module.exports = mongoose.model('Campanha', Schema);
