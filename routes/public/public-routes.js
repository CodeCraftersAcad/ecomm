const Router = require('express').Router();
const {homePage, publicGetProducts, resetPasswordSendEmailController, resetPasswordController} = require('../../controllers/public-controllers/public-controllers');

/*
 * Description: This route will return the home page of the application.
 * Route: /
 * Access: Public
 * Query params: none
 * Query example: /
*/
Router.route('/').get(homePage);

/*
  * Description: Get products for the product page.
  * Route: GET /api/products
  * Access: Public
  * Query params: none
*/
Router.route('/products').get(publicGetProducts);

/*
 * Description: This route will send reset password email.
 * Route: POST /api/users/reset-password
 * Access: Public
*/
Router.route('/user/reset-password').post(resetPasswordSendEmailController);

/*
 * Description: This route will reset user password.
 * Route: POST /api/users/reset-password/:email/:code
 * Access: Public
 * Query params: email, code
 * Query example: /api/users/reset-password/jondoe@example.com/12345678
*/
Router.route('/user/reset-password/:email/').post(resetPasswordController);

module.exports = Router;
