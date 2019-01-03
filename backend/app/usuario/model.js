const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema({
  login: {
    type: String,
    index: { unique: true, dropDups: true }
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario'
  },
  lastUpdateBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario'
  },
  password: String,
  name: String,
  role: String,
  email: String,
  ativo: { type: Boolean, default: true }
});

Schema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

var deepPopulate = require('mongoose-deep-populate')(mongoose);
Schema.plugin(deepPopulate, {});

module.exports = mongoose.model('Usuario', Schema);
