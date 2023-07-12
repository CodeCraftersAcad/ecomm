const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    services: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Service'
        }
    ],
    blogArticles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'BlogArticle'
        }
    ],
}, {
    timestamps: true
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
