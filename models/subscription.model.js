const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    subscription: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports = new mongoose.model('Subscription', subscriptionSchema);