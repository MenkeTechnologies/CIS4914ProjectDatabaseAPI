const mongoose = require("mongoose");
const User = require("./User");

const Message = new mongoose.Schema({
  sender: {
    type: User.schema,
    required: true
  },
  recipient: {
    type: User.schema,
    required: true
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', Message);
