const Review = require('../../../models/ReviewModel');
const generateReviewQuery = require('../../../utils/db-queries/public/public-review-query');
const errorHandler = require('../../../utils/error-handler/controller-errors');

exports.getPublicReviewsService = async (reqQuery, req) => {
    try{
        const query = generateReviewQuery(reqQuery);

        let reviews = await Review.find(query);

        return {
            status: 200,
            message: 'Reviews fetched successfully.',
            reviews,
        }
    } catch (error) {
        console.log('Error in getPublicReviewsService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while fetching reviews. In getPublicReviewsService',
            reviews: [],
        }
    }
}