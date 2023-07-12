const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSubscriptionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: false,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    frequency: {
        type: String,
        enum: ['monthly', 'bimonthly', 'quarterly'],
        required: true,
        default: 'monthly',
    },
    status: {
        type: String,
        enum: ['active', 'paused', 'canceled', 'pending'],
        default: 'pending',
    },
    startDate: {
        type: Date,
        required: false,
    },
    skipCycle: {
        type: Boolean,
        default: false,
    },
    lastCycleDate: {
        type: Date,
        required: false,
    }
});

const SubscriptionModel = mongoose.model('Subscription', ProductSubscriptionSchema);

module.exports = SubscriptionModel;
