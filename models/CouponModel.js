const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: Number,
        required: true,
    },
    discountType: {
        type: String,
        enum: ['percentage', 'amount'],
        default: 'percentage',
    },
    startDate: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: ['public', 'private'],
    },
    endDate: {
        type: Date,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    additionalData: {
        type: Schema.Types.Mixed,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Coupon', CouponSchema);
