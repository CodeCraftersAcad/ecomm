const Router = require('express').Router();
const {getPublicReviewController} = require('../../controllers/public-controllers/public-review-controllers');
const isFeatureEnabled = require('../../middleware/featuresMiddleware');

/*
  * Description: This route will get all reviews
  * Route: GET /api/reviews
  * Access: Public
*/
Router.route('/reviews').get(isFeatureEnabled('REVIEWS'), getPublicReviewController);

module.exports = Router;