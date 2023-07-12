const Router = require('express').Router();
const {validateUser} = require('../../middleware/validators/userValidator');
const {checkEmailAvailability, registerUser, loginUser, validateUserEmail} = require('../../controllers/public-controllers/auth');

/*
 * Description: This route will register a new public-controllers.
 * Route: api/user/register
 * Access: Public
*/
Router.route('/user/register').post(validateUser, registerUser);

/*
 * Description: Check if email is already registered.
 * Route: POST api/user/check-email-availability
 * Access: Public
 * Query params: none
*/
Router.route('/user/check-email-availability').post(checkEmailAvailability);

/*
 * Description: This route will log in a user.
 * Route: POST /api/user/login
 * Access: Public
 * Query params: none
*/
Router.route('/user/login').post(loginUser);

/*
 * Description: This route will check user registration code.
 * Route: POST /api/users/validate-user-email
 * Access: Public
*/
Router.route('/user/validate-user-email').post(validateUserEmail);

module.exports = Router;