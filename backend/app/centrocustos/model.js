const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  codigoCustom: String,
  descricao: String,
  contatos: [
    {
      email: String,
      numero: String,
      nome: String
    }
  ],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario'
  },
  cliente: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cliente'
  },
  lastUpdateBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario'
  }
});

const deepPopulate = require('mongoose-deep-populate')(mongoose);

Schema.plugin(deepPopulate, {});

module.exports = mongoose.model('Centrocustos', Schema);
