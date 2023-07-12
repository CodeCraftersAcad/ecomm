const Router = require('express').Router();
const {getPublicServicesController} = require('../../controllers/public-controllers/public-service-controllers');

/*
  * Description: Route to get all public services
  * Route: GET /api/services
  * Access: Public
  * Query params: none
*/
Router.route('/services').get(getPublicServicesController);

module.exports = Router;