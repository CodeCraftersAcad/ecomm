const User = require('../../../models/UserModel');
const Product = require('../../../models/ProductModel');
const Subscription = require('../../../models/SubscriptionModel');
const errorHandler = require('../../../utils/error-handler/controller-errors');
const {subscriptionQuery} = require('../../../utils/db-queries/user/user-subscription-query')

/*
  * Description: This service is to add a product to a user's subscriptions
  * File Usage: subscription-controller
  * Input: userId, productId, quantity, frequency, startDate, req
*/
exports.addProductToUserSubscriptionService = async (userId, productId, quantity, frequency, startDate, req) => {
    try {
        let user = await User.findById(userId)
        if (!user) {
            return {
                status: 404,
                message: 'User not found.',
                subscription: {},
            };
        }

        const product = await Product.findById(productId)
        if (!product) {
            return {
                status: 404,
                message: 'Product not found.',
                subscription: {},
            };
        }

        let subscription = await Subscription.findOne({user: userId, product: productId});
        if (subscription) {
            return {
                status: 200,
                message: 'Subscription already exists.',
                subscription,
            };
        }

        subscription = await Subscription.create({
            user: userId,
            product: productId,
            quantity,
            frequency,
            startDate,
        });
        if (!subscription) {
            return {
                status: 400,
                message: 'Product could not be added to subscription cart.',
                subscription: {},
            };
        }

        user.subscriptions.push(subscription._id);
        await user.save();

        return {
            status: 201,
            message: 'Product added to subscription cart successfully.',
            subscription,
        }
    } catch (error) {
        console.log('Error in addProductToSubscriptionCartService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while adding product to subscription cart. In addProductToSubscriptionCartService',
            subscription: {},
        }
    }
};

/*
  * Service Worker: Update User Subscription
  * File Usage: /controllers/user-auth/user-auth-subscriptions-controller.js
  * Parameter(s): userId, subscriptionId, quantity, frequency, status, req
 */
exports.updateUserSubscriptionService = async (userId, subscriptionId, quantity, frequency, status, req) => {
    try {
        let user = await User.findById(userId)
        if (!user) {
            return {
                status: 404,
                message: 'User not found.',
                subscription: {},
            };
        }

        let subscription = await Subscription.findById(subscriptionId)
        if (!subscription) {
            return {
                status: 404,
                message: 'Subscription not found.',
                subscription: {},
            };
        }

        if (subscription.user.toString() !== userId) {
            return {
                status: 401,
                message: 'Unauthorized.',
                subscription: {},
            };
        }

        subscription.quantity = quantity;
        subscription.frequency = frequency;
        subscription.status = status;
        await subscription.save();

        return {
            status: 201,
            message: 'Subscription updated successfully.',
            subscription,
        }
    } catch (error) {
        console.log('Error in updateUserSubscriptionService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while updating subscription cart. In updateUserSubscriptionService',
            subscription: {},
        }
    }
}

/*
    * Service Worker: Get User Subscriptions
    * File Usage: /controllers/user-auth/user-auth-subscriptions-controller.js
    * Parameter(s): queryOptions, req
 */
exports.getUserSubscriptionsService = async (queryOptions, req) => {
    let query  = await subscriptionQuery(queryOptions);

    try {
        const subscription = await Subscription.find(query);
        if (!subscription) {
            return {
                status: 404,
                message: 'Subscriptions not found.',
                subscription: [],
            };
        }

        return {
            status: 200,
            message: 'Subscriptions fetched successfully.',
            subscription,
        };
    } catch (error) {
        console.log('Error in fetchSubscriptionsService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while fetching subscriptions. In fetchSubscriptionsService',
            subscription: [],
        }
    }
};

/*
  * Service Worker: Delete User Pending Subscription
  * File Usage: /controllers/user-auth/user-auth-subscriptions-controller.js
  * Parameter(s): userId, subscriptionId, req
*/
exports.deleteUserPendingSubscriptionService = async (userId, subscriptionId, req) => {
  try {
      const pendingSubscriptionToDelete = await Subscription.findOneAndDelete({_id: subscriptionId, user: userId, status: 'pending'});
        if (!pendingSubscriptionToDelete) {
            return {
                status: 404,
                message: 'Subscription not found or is active.',
                subscription: {},
            };
        }

        return {
            status: 200,
            message: 'Subscription deleted successfully.',
            subscription: pendingSubscriptionToDelete,
        }

  } catch (error) {
      console.log('Error in deleteUserPendingSubscriptionService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while deleting subscription. In deleteUserPendingSubscriptionService',
            subscription: {},
        }
  }
}