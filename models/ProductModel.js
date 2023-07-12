const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    size: [String],
    description: String,
    usage: String,
    stockStatus: {
        type: String,
        enum: ['in stock', 'out of stock', 'backorder', 'discontinued'],
        default: 'in stock'
    },
    brand: String,
    images: [
        {
            defaultImage: { type: Schema.Types.ObjectId, ref: 'Image' },
            order: Number
        }
    ],
    published: {
        type: Boolean,
        default: false
    },
    category: String,
    ingredients: [String],
    benefits: [String],
    skinType: [String],
    price: Number,
    salesPrice: Number,
    saleStartDate: Date,
    saleEndDate: Date,
    step: Number,
    tags: [String],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
            required: false
        }
    ],
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
