const mongoose = require("mongoose");
const User = require("./User");
const {SchemaTypes} = require("mongoose");

const Message = new mongoose.Schema({
  sender: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },
  recipient: {
    type: SchemaTypes.ObjectId,
    ref: "User",
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
