const {addProductToUserSubscriptionService, updateUserSubscriptionService, getUserSubscriptionsService, deleteUserPendingSubscriptionService} = require('../../services/controller-services/user-auth/user-auth-subscriptions-services');
const errorHandler = require('../../utils/error-handler/controller-errors');
const {sendErrorResponse} = require('../../utils/error-handler/error-response');

/*
 * Description: Add product to user subscription cart
*/
exports.addProductToUserSubscriptionController = async (req, res) => {
    const {productId} = req.params;
    const userId = req.user.id;
    const {quantity, frequency, startDate} = req.body;
    try {
        const {status, message, subscription} = await addProductToUserSubscriptionService(userId, productId, quantity, frequency, startDate, req);

        res.status(status).send({message, subscription});
    } catch (error) {
        console.log('Error in addProductToSubscriptionCartController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while adding the product to subscription cart.', error, {product: {}});
    }
};

/*
  * Description: Update user product subscription cart
*/
exports.updateUserSubscriptionController = async (req, res) => {
    const {subscriptionId} = req.params;
    const userId = req.user.id;
    const {quantity, frequency, status: subscriptionStatus } = req.body;
    try {
        const {status, message, subscription} = await updateUserSubscriptionService(userId, subscriptionId, quantity, frequency, subscriptionStatus, req);

        res.status(status).send({message, subscription});
    } catch (error) {
        console.log('Error in updateUsersSubscriptionController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while updating the subscription cart.', error, {product: {}});
    }
}

/*
  * Description: Get all user subscriptions
*/
exports.getAllUserSubscriptionsController = async (req, res) => {
    let query = req.query;
    try {
        const {status, message, subscription} = await getUserSubscriptionsService(query, false, req);

        res.status(status).send({message, subscription});
    } catch (error) {
        console.log('Error in getAllUserSubscriptionsController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while fetching the subscription cart.', error, {subscription: []});
    }
}

/*
  * Description: Delete users pending subscription
*/
exports.deleteUserPendingSubscriptionController = async (req, res) => {
    const {subscriptionId} = req.params;
    const userId = req.user.id;
    try {
        const {status, message, subscription} = await deleteUserPendingSubscriptionService(userId, subscriptionId, req);

        res.status(status).send({message, subscription});
    } catch (error) {
        console.log('Error in deleteUserPendingSubscriptionController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while deleting the subscription.', error, {subscription: {}});
    }
}
