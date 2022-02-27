const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', User);
