const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    // image: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Image',
    //     required: false
    // },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    link: String,
    category: String,
    pages: [String],
    placement: {
        type: String,
        enum: ['top', 'bottom', 'middle'],
        default: 'top'
    },
    additionalData: Schema.Types.Mixed,
    userPrivate: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Banner', BannerSchema);
