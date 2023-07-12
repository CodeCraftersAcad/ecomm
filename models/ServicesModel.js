const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['facial', 'treatment', 'body'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    rating: {
        type: Number,
        required: false,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        required: false
    },
}, {timestamps: true});

module.exports = mongoose.model('Service', ServiceSchema);