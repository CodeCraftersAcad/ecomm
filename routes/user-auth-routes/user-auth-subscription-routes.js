const Router = require('express').Router();
const {userTokenAuth} = require('../../middleware/auth');
const {
    addProductToUserSubscriptionController,
    updateUserSubscriptionController,
    getAllUserSubscriptionsController,
    deleteUserPendingSubscriptionController
} = require("../../controllers/user-auth-controllers/user-auth-subscription-controllers");
const isFeatureEnabled = require('../../middleware/featuresMiddleware');

/*
 * Description: Add product to user Subscription
 * Route: POST /api/admin/subscriptions/product/:prodId
 * Access: Private
 * Query params: prodId
*/
Router.route('/user/subscriptions/product/:productId').post(isFeatureEnabled('SUBSCRIPTIONS'), userTokenAuth, addProductToUserSubscriptionController);

/*
 * Description: Update single users product subscription
 * Route: PUT /api/user/subscriptions/products/:subscriptionId
 * Access: Private
 * Query params: subscriptionId
*/
Router.route('/user/subscriptions/:subscriptionId').put(isFeatureEnabled('SUBSCRIPTIONS'), userTokenAuth, updateUserSubscriptionController);

/*
 * Description: Get users subscriptions
 * Route: GET /api/user/subscriptions
 * Access: Private
 * Query params: none
*/
Router.route('/user/subscriptions').get(isFeatureEnabled('SUBSCRIPTIONS'), userTokenAuth, getAllUserSubscriptionsController);

/*
    * Description: Remove users pending subscription
    * Route: DELETE /api/user/subscriptions/:subscriptionId
    * Access: Private
    * Query params: subscriptionId
*/
Router.route('/user/subscriptions/:subscriptionId').delete(isFeatureEnabled('SUBSCRIPTIONS'), userTokenAuth, deleteUserPendingSubscriptionController);

module.exports = Router;