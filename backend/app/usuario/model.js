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
  active: { type: Boolean, default: true },
  avatar : {
    filename: { type: String, default: '' },
    mimetype: { type: String, default: '' },
    folder: { type: String, default: '' },
  }
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

module.exports = mongoose.model('Usuario', Schema);
