const mongoose = require('mongoose')
const User = require("./User");
const {SchemaTypes} = require("mongoose");

const ProjectPost = new mongoose.Schema({
  author: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  postType: {
    type: String,
    required: false,
    default: "offering"
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
