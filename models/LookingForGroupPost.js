const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    memberName: {
        type: String,
        required: false
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

const LookingForGroupPostSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },

    authorType: {
        type: String,
        enum: ['Faculty', 'Student'],
        required: true
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
        type: [MemberSchema],
        required: false
    }
});

const model = mongoose.model('LookingForGroupPostModel', ProjectTopicPostSchema);

module.exports = model;