const Router = require('express').Router();
const {
    addProductReviewController,
    updateReviewController,
    deleteReviewController
} = require('../../controllers/user-auth-controllers/user-auth-review-controllers');
const {userTokenAuth} = require('../../middleware/auth')
const isFeatureEnabled = require('../../middleware/featuresMiddleware');

/*
  * Description: Add user review
  * Route: POST /api/user/reviews/products/:productId/
  * Access: Private (user)
  * Query params: productId
*/
Router.route('/user/reviews/products/:productId/').post(userTokenAuth, isFeatureEnabled('REVIEWS'), addProductReviewController);

/*
  * Description: Update user review
  * Route: PUT /api/user/reviews/:reviewId/
  * Access: Private (user)
  * Query params: reviewId
  *
  * Description: Delete user review
  * Route: DELETE /api/user/reviews/:reviewId/
  * Access: Private (user)
  * Query params: reviewId
*/
Router.route('/user/reviews/:reviewId/').put(userTokenAuth, isFeatureEnabled('REVIEWS'), updateReviewController)
    .delete(userTokenAuth, isFeatureEnabled('REVIEWS'), deleteReviewController);

module.exports = Router