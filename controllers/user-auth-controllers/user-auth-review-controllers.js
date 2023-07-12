const {addProductReviewService, updateProductReviewService, deleteProductReviewService} = require('../../services/controller-services/user-auth/user-auth-reviews-services');
const errorHandler = require('../../utils/error-handler/controller-errors');
const {sendErrorResponse} = require('../../utils/error-handler/error-response');

/*
  * Description: Add a product review
*/
exports.addProductReviewController = async (req, res) => {
    try {
        const {productId} = req.params;
        let userId = req.user.id;

        const {status, message, review} = await addProductReviewService(req.body, productId, userId, req);

        res.status(status).send({message, review});
    } catch (error) {
        console.log('Error in addProductReviewController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while adding the review.', error, {review: {}});
    }
}

/*
  * Description: Update a product review
*/
exports.updateReviewController = async (req, res) => {
    let {reviewId} = req.params;
    let userId = req.user.id;
    try {
        const {status, message, review} = await updateProductReviewService(reviewId, req.body, userId, req);

        res.status(status).send({message, review})
    } catch (error) {
        console.log('Error in updateReviewController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while adding the review.', error, {review: {}});
    }
}

/*
  * Description: Delete a product review
*/
exports.deleteReviewController = async (req, res) => {
    let {reviewId} = req.params;
    let userId = req.user.id;

    try {
        const {status, message, review} = await deleteProductReviewService(reviewId, userId, req);

        res.status(status).send({message, review})
    } catch (error) {
        console.log('Error in deleteReviewController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while deleting the review.', error, {review: {}});
    }
}