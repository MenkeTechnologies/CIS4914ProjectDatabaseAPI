const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    memberName: {
        type: String,
        required: true
    },

    memberEmail: {
        type: String,
        required: false
    },

    memberContact: {
        type: String,
        required: false
    }
});

const ProjectTopicPostSchema = new mongoose.Schema({
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
        type: [MemberSchema],
        required: false
    }
});

const model = mongoose.model('ProjectTopicPostModel', ProjectTopicPostSchema);

module.exports = model;