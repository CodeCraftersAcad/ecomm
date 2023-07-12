const mongoose = require('mongoose');

const ErrorLogSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    stack: {
        type: String,
        required: false,
    },
    timestamp: {type: Date, default: Date.now},
    pathname: {
        type: String,
        required: false,
    },
    method: {
        type: String,
        required: false,
    },
    query: {
        type: Object,
        required: false,
    },
    body: {
        type: Object,
        required: false,
    },
    user: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('ErrorLog', ErrorLogSchema);
