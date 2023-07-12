const Router = require('express').Router();
const {addRemoveProductFromFavoritesController, addRemoveServiceFromFavoritesController} = require('../../controllers/user-auth-controllers/user-auth-favorites-controller');
const {userTokenAuth} = require('../../middleware/auth')
const isFeatureEnabled = require('../../middleware/featuresMiddleware');

/*
  * Description: This route will add/remove a product from user's favorites.
  * Route: POST /api/users/favorites/:productId
  * Access: Private
  * Query params: none
*/
Router.route('/user/favorites/products/:productId').put(userTokenAuth, isFeatureEnabled('FAVORITES'), addRemoveProductFromFavoritesController);

/*
  * Description: This route will add/remove a service from user's favorites.
  * Route: POST /api/users/favorites/:serviceId
  * Access: Private
  * Query params: none
*/
Router.route('/user/favorites/services/:serviceId').put(userTokenAuth, isFeatureEnabled('FAVORITES'), addRemoveServiceFromFavoritesController);



module.exports = Router;