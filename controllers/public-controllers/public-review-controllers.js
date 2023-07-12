const {getPublicReviewsService} = require('../../services/controller-services/public/user-public-reviews-services');
const errorHandler = require('../../utils/error-handler/controller-errors');
const {sendErrorResponse} = require('../../utils/error-handler/error-response');

exports.getPublicReviewController = async (req, res) => {
    let query = req.query;
    try {
        const reviews = await getPublicReviewsService(query, req);
        if (reviews.status === 500) return res.status(reviews.status).send({message: reviews.message, reviews: []});

        res.status(reviews.status).send({message: reviews.message, reviews: reviews.reviews});
    } catch (error) {
        console.log('Error in getPublicReviewController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while fetching the reviews.', {reviews: []});
    }
}