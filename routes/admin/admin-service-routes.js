const Router = require('express').Router();
const {
    adminGetServicesController,
    adminCreateServiceController,
    adminUpdateServiceController,
    adminDeleteServiceController
} = require('../../controllers/admin-controllers/admin-service-controllers');
const {userTokenAuth, authAdmin} = require('../../middleware/auth');

/*
    * Description: Admin route to get all services w/wo query.
    * Route: GET /api/admin-controllers/services
    * Access: Private (Admin)
    * Query params: none

    * Description: Admin route to create a new service.
    * Route: POST /api/admin-controllers/services
    * Access: Private (Admin)
    * Query params: none
 */
Router.route('/admin-controllers/services')
    .get(userTokenAuth, authAdmin, adminGetServicesController)
    .post(userTokenAuth, authAdmin, adminCreateServiceController);

/*
  * Description: Admin route to update a service.
  * Route: PUT /api/admin-controllers/services/:serviceId
  * Access: Private (Admin)
  * Query params: serviceId

  * Description: Admin route to delete a service.
  * Route: DELETE /api/admin-controllers/services/:serviceId
  * Access: Private (Admin)
  * Query params: serviceId
*/
Router.route('/admin-controllers/services/:serviceId')
    .delete(userTokenAuth, authAdmin, adminDeleteServiceController)
    .put(userTokenAuth, authAdmin, adminUpdateServiceController);

module.exports = Router;