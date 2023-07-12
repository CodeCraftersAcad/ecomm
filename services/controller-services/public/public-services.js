const Coupon = require('../../../models/CouponModel');
const Product = require('../../../models/ProductModel');
const Banner = require('../../../models/BannerModel');
const Service = require('../../../models/ServicesModel');
const User = require('../../../models/UserModel');
const {publicProductQuery} = require('../../../utils/db-queries/public/public-product-query');
const errorHandler = require('../../../utils/error-handler/controller-errors');
const {sendPasswordResetEmailService} = require('../email-services');
const bcrypt = require('bcrypt');

/*
  * Description: Service worker for getting coupons for the home page
  * File Usage: /controllers/public-controllers/public-controllers-controllers.js
  * Query params: none
*/
exports.getHomePageCouponsService = async (req) => {
    try {
        const currentDate = new Date();
        const coupons = await Coupon.find({
            startDate: {
                $lte: currentDate,
            },
            endDate: {
                $gte: currentDate,
            }
        });

        return {
            status: 200,
            message: 'Coupons found successfully.',
            coupons,
        }
    } catch (error) {
        console.log('Error in getHomePageCouponsService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while fetching the coupons. In getHomePageCouponsService',
            coupons: []
        }
    }
}

/*
  * Description: Service worker for getting products for the home page
  * File Usage: /controllers/public-controllers/public-controllers-controllers.js
  * Query params: none
*/
exports.getHomePageProductsService = async (req) => {
    try {
        let products = await Product.find({}).sort({createdAt: -1}).limit(3);

        return {
            status: 200,
            message: 'Products fetched successfully.',
            products,
        }
    } catch (error) {
        console.log('Error in getHomePageProductsService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while fetching products. In getHomePageProductsService',
            products: [],
        }
    }
}

/*
 * Description: Service worker for getting banners for the home page
 * File Usage: /controllers/public-controllers/public-controllers-controllers.js
 * Query params: none
*/
exports.getHomePageBannersService = async (req) => {
    try {
        const currentDate = new Date();
        const banners = await Banner.find({
            startDate: {
                $lte: currentDate,
            },
            endDate: {
                $gte: currentDate,
            },
            pages: {
                $in: ['home']
            }
        });

        return {
            status: 200,
            message: 'Banners fetched successfully.',
            banners,
        }
    } catch (error) {
        console.log('Error in getHomePageBannersService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while fetching banners. In getHomePageBannersService',
            banners: [],
        }
    }
}

/*
  * Description: Service worker for getting featured services for the home page
  * File Usage: /controllers/public-controllers/public-controllers-controllers.js
  * Query params: none
*/
exports.getHomePageFeaturedServicesService = async (req) => {
    try {
        const services = await Service.find({isFeatured: true});

        return {
            status: 200,
            message: 'Services fetched successfully.',
            services,
        }
    } catch (error) {
        console.log('Error in getHomePageFeaturedServicesService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while fetching services. In getHomePageFeaturedServicesService',
            services: [],
        }
    }
};

/*
  * Description: Service worker for getting products for the products page
  * File Usage: /controllers/public-controllers/public-controllers-controllers.js
  * Query params: none
*/
exports.getProductsService = async (reqQuery, req) => {
    const { query, pageOptions, skip } = await publicProductQuery(reqQuery);

    try {
        const products = await Product.find(query)
            .skip(skip)
            .limit(pageOptions.limit);

        return {
            status: 200,
            message: 'Products fetched successfully.',
            products,
        };
    } catch (error) {
        console.log('Error in getProductsService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while fetching products in getProductsService.',
            products: [],
        };
    }
};

/*
  * Description: Service worker to send reset password email
  * File Usage: /controllers/public-controllers/public-controllers-controllers.js
  * Query params: email
*/
exports.resetPasswordEmailService = async (email, req) => {
    try {
        // check if email exists
        const user = await User.findOne({email});
        if (!user) return {status: 404, message: 'User does not exist.', email: {}};

        const passwordResetCode = Math.random().toString(36).slice(-8);
        const passwordResetCodeExpiration = Date.now() + 15 * 60 * 1000; // Expires in 15 minutes

        user.passwordReset = {
            passwordResetCode,
            passwordResetCodeExpiration
        }
        user.accountStatus = 'paused'
        await user.save();

        await sendPasswordResetEmailService(email, passwordResetCode);

        return {status: 200, message: 'Email password reset sent successfully.', email: email};
    } catch (error) {
        console.log('Error in resetPasswordEmailService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while sending the email.',
            email: {}
        }
    }
}

/*
    * Description: Service worker to confirm reset password
    * File Usage: /controllers/public-controllers/public-controllers-controllers.js
    * Query params: email, code, password
 */
exports.resetPasswordService = async (email, code, password, req) => {
    try {
        const user = await User.findOne({email});
        if (!user) return {status: 404, message: 'User does not exist.', reset: false};

        if (user.passwordReset.passwordResetCode !== code) return {
            status: 400,
            message: 'Invalid code or code has expired',
            reset: false
        }

        if (user.passwordReset.passwordResetCodeExpiration < Date.now()) return {
            status: 400,
            message: 'Code is expired. Please click send new code.',
            reset: false
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) return {
            status: 400,
            message: 'New password cannot be the same as old password',
            reset: false
        }

        if (user.accountStatus !== 'paused') return {
            status: 400,
            message: 'Invalid passcode. Check code and try again. Please contact support if this is an error',
            reset: false
        }

        user.password = password;
        user.accountStatus = 'active';
        user.passwordReset.passwordResetCode = '';
        user.passwordReset.passwordResetCodeExpiration = '';

        await user.save();

        return {status: 200, message: 'Password reset successfully', reset: true};
    } catch (error) {
        console.log('Error in resetPasswordService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: error.message,
            reset: false
        }
    }
}


