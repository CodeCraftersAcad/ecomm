const Coupon = require('../../../models/CouponModel');
const errorHandler = require('../../../utils/error-handler/controller-errors');
const generateCouponQuery = require('../../../utils/db-queries/admin/admin-coupon-query');

/*
  * Description: Admin service worker to get all coupons w/wo query.
  * File Usage: controllers/admin-controllers/admin-controllers-coupon-controllers.js
  * Params: query, (req.query)
*/
exports.adminGetCouponsService = async (query, req) => {
    let requestQuery = await generateCouponQuery(query);
    try {
        let coupons = await Coupon.find(requestQuery);

        return {
            status: 200,
            message: 'Coupons fetched successfully.',
            coupons,
        }
    } catch (error) {
        console.log('Error in adminGetCouponsSerivce');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while fetching coupons. In adminGetCouponsSerivce',
            coupons: [],
        }
    }
}

/*
  * Description: Admin service worker to create a coupon.
  * File Usage: controllers/admin-controllers/admin-controllers-coupon-controllers.js
  * Params: couponBody, (req.body)
*/
exports.adminCreateCouponService = async (couponBody, req) => {
    try {
        let existingCoupon = await Coupon.findOne({name: couponBody.name});
        if (existingCoupon) {
            return {
                status: 400,
                message: 'Coupon with same name already exists.',
                coupon: {}
            }
        }

        const newCoupon = await Coupon.create(couponBody);
        if (!newCoupon)
            return {
                status: 400,
                message: 'Coupon could not be created.',
                coupon: {}
            }

        return {
            status: 201,
            message: 'Coupon created successfully.',
            coupon: newCoupon,
        }
    } catch (error) {
        console.log('Error in adminCreateCouponService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while creating the coupon. In adminCreateCouponService',
            coupon: {},
        }
    }
}

/*
  * Description: Admin service worker to update a coupon.
  * File Usage: controllers/admin-controllers/admin-controllers-coupon-controllers.js
  * Params: couponId, couponBody, (req.params, req.body)
*/
exports.adminUpdateCouponService = async (couponId, couponBody, req) => {
    try {
        let coupon = await Coupon.findByIdAndUpdate({_id: couponId}, couponBody, {new: true});
        if (!coupon) {
            return {
                status: 404,
                message: 'Coupon not found.',
                coupon: {}
            }
        }

        return {
            status: 200,
            message: 'Coupon updated successfully.',
            coupon,
        }
    } catch (error) {
        console.log('Error in adminUpdateCouponService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while updating the coupon. In adminUpdateCouponService',
            coupon: {},
        }
    }
}

/*
  * Description: Admin service worker to delete a coupon.
  * File Usage: controllers/admin-controllers/admin-controllers-coupon-controllers.js
  * Params: couponId, (req.params)
*/
exports.adminDeleteCouponService = async (couponId, req) => {
    try {
        let coupon = await Coupon.findByIdAndDelete({_id: couponId});
        if (!coupon) {
            return {
                status: 404,
                message: 'Coupon not found.',
                coupon: {}
            }
        }

        return {
            status: 200,
            message: 'Coupon deleted successfully.',
            coupon,
        }
    } catch (error) {
        console.log('Error in adminDeleteCouponService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while deleting the coupon. In adminDeleteCouponService',
            coupon: {},
        }
    }
}