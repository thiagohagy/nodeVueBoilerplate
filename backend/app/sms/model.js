const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  numero: String,
  mensagem: String,
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario'
  },
  cliente: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cliente'
  },
  campanha: {
    type: mongoose.Schema.ObjectId,
    ref: 'Campanha'
  },
  envioAvulso: {
    type: Boolean,
    default: false
  },
  data: { type: Date, default: Date.now }
});

const deepPopulate = require('mongoose-deep-populate')(mongoose);

Schema.plugin(deepPopulate, {});

module.exports = mongoose.model('Sms', Schema);
