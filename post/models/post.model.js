const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastInitial: {
    type: String,
    max: 1,
    required: true,
  },
  assignedVolunteer: {
    type: String,
    required: true,
  },
  // postId: {
  //     type: Number,
  //     required: true,
  // },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  // thumbnailType: {
  //     type: String,
  //     required: true,
  // },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  completionStatus: {
    type: String,
    required: true,
  },
  completionDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
