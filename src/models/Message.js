const mongoose = require("mongoose");
const {SchemaTypes} = require("mongoose");

/**
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, any, any>}
 */
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
