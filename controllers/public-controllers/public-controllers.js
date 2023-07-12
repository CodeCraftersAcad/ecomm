const {
    getHomePageCouponsService,
    getHomePageProductsService,
    getHomePageBannersService,
    getHomePageFeaturedServicesService,
    getProductsService,
    resetPasswordEmailService,
    resetPasswordService
} = require('../../services/controller-services/public/public-services');
const {sendErrorResponse} = require('../../utils/error-handler/error-response');
const errorHandler = require('../../utils/error-handler/controller-errors');

/*
  * Description: Get coupons, products, and banners for the home page.
*/
exports.homePage = async (req, res) => {
    try {
        const [coupons, products, banners, services] = await Promise.all([
            getHomePageCouponsService(req),
            getHomePageProductsService(req),
            getHomePageBannersService(req),
            getHomePageFeaturedServicesService(req)
        ]);

        res.status(200).send({message: 'Data fetched successfully', coupons, products, banners, services});
    } catch (error) {
        console.log('Error in homePageController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while fetching the home page.', {
            coupons: [],
            products: [],
            banners: []
        });
    }
};

/*
  * Description: Get products for the product page.
*/
exports.publicGetProducts = async (req, res) => {
    let query = req.query;
    try {
        const {status, message, products} = await getProductsService(query, req);

        res.status(status).send({message, products});
    } catch (error) {
        console.log('Error in getProductController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while fetching the products.', []);
    }
};

exports.resetPasswordSendEmailController = async (req, res) => {
    try {
        const {email} = req.body;
        const {status, message, emailSent} = await resetPasswordEmailService(email, req);

        res.status(status).send({message, emailSent});
    } catch (error) {
        console.log('Error in resetPasswordEmailController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while sending the reset password email.', {token: ''});
    }
};

exports.resetPasswordController = async (req, res) => {
    try {
        const {password, code} = req.body;
        const {email} = req.params;
        const {status, message, reset} = await resetPasswordService(email, code, password, req);

        res.status(status).send({message, reset});
    } catch (error) {
        console.log('Error in resetPasswordController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while resetting the password.', {reset: false});
    }
};