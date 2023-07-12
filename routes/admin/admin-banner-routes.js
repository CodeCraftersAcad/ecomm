const Router = require('express').Router();
const {
    adminGetBannersController,
    adminCreateBannerController,
    adminUpdateBannerController,
    adminDeleteBannerController
} = require('../../controllers/admin-controllers/admin-banner-controllers');
const {userTokenAuth, authAdmin} = require('../../middleware/auth');
const isFeatureEnabled = require('../../middleware/featuresMiddleware');

/*
    * Description: Route to get all banners
    * Route: GET /api/admin-controllers/banners
    * Access: Private (Admin)
    * Query params: none

    * Description: Route to create a banner
    * Route: POST /api/admin-controllers/banners
    * Access: Private (Admin)
    * Query params: none
*/
Router.route('/admin/banners')
    .get(userTokenAuth, authAdmin, isFeatureEnabled('BANNERS'), adminGetBannersController)
    .post(userTokenAuth, authAdmin, isFeatureEnabled('BANNERS'), adminCreateBannerController);

/*
    * Description: Route to update a banner
    * Route: PUT /api/admin-controllers/banners/:bannerId
    * Access: Private (Admin)
    * Query params: bannerId

    * Description: Route to delete a banner
    * Route: DELETE /api/admin-controllers/banners/:bannerId
    * Access: Private (Admin)
    * Query params: bannerId
*/
Router.route('/admin/banners/:bannerId')
    .put(userTokenAuth, authAdmin, isFeatureEnabled('BANNERS'), adminUpdateBannerController)
    .delete(userTokenAuth, authAdmin, isFeatureEnabled('BANNERS'), adminDeleteBannerController);

module.exports = Router;