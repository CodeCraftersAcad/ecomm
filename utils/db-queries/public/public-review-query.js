const generateReviewQuery = (reqQuery) => {
    const { productId, userId, rating, verified } = reqQuery;
    let query = {};

    if (productId) {
        query.product = productId;
    }

    if (userId) {
        query.user = userId;
    }

    if (rating) {
        query.rating = rating;
    }

    if (verified !== undefined) {
        query.verified = verified;
    }

    return query;
};

module.exports = generateReviewQuery;
