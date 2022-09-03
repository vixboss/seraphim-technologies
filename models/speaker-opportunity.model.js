const mongoose = require('mongoose');

const speakerOpportunitySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    fax: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    industries: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports = new mongoose.model('SpeakerOpportunity', speakerOpportunitySchema);