const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    memberName: {
        type: String,
        required: true
    },

    memberContact: {
        type: String,
        required: false
    }
})

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
    //Change lists to string arrays
    skillsList: {
        type: String,
        required: true
    },

    softwareList: {
        type: String,
        required: true
    },

    advisor: {
        type: String,
        required: false
    },

    members: {
        type: String,
        required: false
    }
})

const model = mongoose.model('ProjectTopicPostModel', ProjectTopicPostSchema)

module.exports = model