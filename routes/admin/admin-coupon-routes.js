const Router = require('express').Router();
const {userTokenAuth, authAdmin} = require('../../middleware/auth');

const {
    adminGetCoupons,
    adminCreateCoupon,
    adminUpdateCoupon,
    adminDeleteCoupon
} = require('../../controllers/admin-controllers/admin-coupon-controllers');
const isFeatureEnabled = require('../../middleware/featuresMiddleware');

/*
  * Description: Admin route to get all coupons w/wo query.
  * Route: GET /api/admin-controllers/coupons
  * Access: Private (Admin)
  * Query params: none

  * Description: Admin route to create a new coupon.
  * Route: POST /api/admin-controllers/coupons
  * Access: Private (Admin)
  * Query params: none
*/
Router.route('/admin/coupons')
    .get(isFeatureEnabled('COUPONS'), userTokenAuth, authAdmin, adminGetCoupons)
    .post(isFeatureEnabled('COUPONS'), userTokenAuth, authAdmin, adminCreateCoupon);

/*
  * Description: Admin route to update a coupon.
  * Route: PUT /api/admin-controllers/coupons/:couponId
  * Access: Private (Admin)
  * Query params: couponId

  * Description: Admin route to delete a coupon.
  * Route: DELETE /api/admin-controllers/coupons/:couponId
  * Access: Private (Admin)
  * Query params: couponId
*/
Router.route('/admin/coupons/:couponId')
    .delete(isFeatureEnabled('COUPONS'), userTokenAuth, authAdmin, adminDeleteCoupon)
    .put(isFeatureEnabled('COUPONS'), userTokenAuth, authAdmin, adminUpdateCoupon);

module.exports = Router;