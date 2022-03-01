const mongoose = require('mongoose')
const User = require("./User");

const ProjectPost = new mongoose.Schema({
  author: {
    type: User.schema,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
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
