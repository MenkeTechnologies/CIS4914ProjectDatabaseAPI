const mongoose = require('mongoose')
const User = require("./User");

const ProjectPost = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },

  authorType: {
    type: String,
    enum: ['Faculty', 'Student'],
    required: true
  },

  topic: {
    type: String,
    required: true
  },

  preferredContact: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    required: true
  },

  skillsList: {
    type: [String],
    required: true
  },

  softwareList: {
    type: [String],
    required: true
  },

  advisor: {
    type: String,
    required: false
  },

  memberList: {
    type: [User.schema],
    required: false
  }
});

module.exports = mongoose.model('ProjectPost', ProjectPost);
