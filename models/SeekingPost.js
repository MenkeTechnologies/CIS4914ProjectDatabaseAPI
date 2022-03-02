const mongoose = require('mongoose')
const User = require("./User");
const {SchemaTypes} = require("mongoose");


const SeekingPost = new mongoose.Schema({
  author: {
    type: SchemaTypes.ObjectId,
    ref: "User",
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
  postType: {
    type: String,
    required: false,
    default: "seeking"
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
