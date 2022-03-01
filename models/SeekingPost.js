const mongoose = require('mongoose')
const User = require("./User");


const SeekingPost = new mongoose.Schema({
  author: {
    type: User.schema,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  title: {
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

  memberList: {
    type: [User.schema],
    required: false
  }
});

module.exports = mongoose.model('SeekingPost', SeekingPost);
