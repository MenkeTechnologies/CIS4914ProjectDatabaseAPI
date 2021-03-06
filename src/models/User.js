/**
 * @file User domain object
 */

const mongoose = require("mongoose");

/**
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, any, any>}
 */
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
  type: {
    type: String,
    enum: ['Faculty', 'Student'],
    required: true
  },
});

module.exports = mongoose.model('User', User);
