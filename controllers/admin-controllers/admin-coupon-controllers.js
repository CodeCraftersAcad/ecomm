const errorHandler = require('../../utils/error-handler/controller-errors');
const {
    adminGetCouponsService,
    adminCreateCouponService,
    adminUpdateCouponService,
    adminDeleteCouponService
} = require('../../services/controller-services/admin/admin-coupon-services');


/*
  * Description: Admin service to get all coupons w/wo query.
*/
exports.adminGetCoupons = async (req, res) => {
    let query = req.query;
    try {
        let {status, message, coupons} = await adminGetCouponsService(query, req);

        res.status(status).send({message, coupons});
    } catch (error) {
        console.log('Error in adminGetCoupons');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while fetching coupons. In adminGetCoupons',
            coupons: [],
        }
    }
}

/*
  * Description: Admin service to create a coupon.
*/
exports.adminCreateCoupon = async (req, res) => {
    let couponBody = req.body;
    try {
        let {status, message, coupon} = await adminCreateCouponService(couponBody, req);

        res.status(status).send({message, coupon});
    } catch (error) {
        console.log('Error in adminCreateCoupon');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while creating coupon. In adminCreateCoupon',
            coupon: {},
        }
    }
};

/*
  * Description: Admin service to update a coupon.
*/
exports.adminUpdateCoupon = async (req, res) => {
    let couponBody = req.body;
    let {couponId} = req.params;
    try {
        let {status, message, coupon} = await adminUpdateCouponService(couponId, couponBody, req);

        res.status(status).send({message, coupon});
    } catch (error) {
        console.log('Error in adminUpdateCoupon');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while updating coupon. In adminUpdateCoupon',
            coupon: {},
        }
    }
};

/*
  * Description: Admin service to delete a coupon.
*/
exports.adminDeleteCoupon = async (req, res) => {
    let {couponId} = req.params;
    try {
        let {status, message, coupon} = await adminDeleteCouponService(couponId, req);

        res.status(status).send({message, coupon});
    } catch (error) {
        console.log('Error in adminDeleteCoupon');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while deleting coupon. In adminDeleteCoupon',
            coupon: {},
        }
    }
};
