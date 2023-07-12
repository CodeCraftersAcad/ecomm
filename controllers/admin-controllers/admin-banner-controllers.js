const {
    adminGetBannersService,
    adminCreateBannerService,
    adminUpdateBannerService,
    adminDeleteBannerService
} = require('../../services/controller-services/admin/admin-banner-services');
const errorHandler = require('../../utils/error-handler/controller-errors');
const {sendErrorResponse} = require('../../utils/error-handler/error-response');

/*
  * Description: Admin controller to get all banners
*/
exports.adminGetBannersController = async (req, res) => {
    try {
        const {status, message, banners} = await adminGetBannersService(req.query, req);

        res.status(status).send({message, banners});
    } catch (error) {
        console.log('Error in adminGetBannersController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while fetching banners.', error, {banners: []});
    }
};

/*
  * Description: Admin controller to create a banner
*/
exports.adminCreateBannerController = async (req, res) => {
    try {
        const {status, message, banner} = await adminCreateBannerService(req.body, req);

        res.status(status).send({message, banner});
    } catch (error) {
        console.log('Error in adminCreateBannerController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while creating the banner.', error, {banner: {}});
    }
};

/*
  * Description: Admin controller to update a banner
*/
exports.adminUpdateBannerController = async (req, res) => {
    const {bannerId} = req.params;
    try {
        const {status, message, banner} = await adminUpdateBannerService(bannerId, req.body, req);

        res.status(status).send({message, banner});
    } catch (error) {
        console.log('Error in adminUpdateBannerController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while updating the banner.', error, {banner: {}});
    }
};

/*
  * Description: Admin controller to delete a banner
*/
exports.adminDeleteBannerController = async (req, res) => {
    const {bannerId} = req.params;
    try {
        const {status, message, banner} = await adminDeleteBannerService(bannerId, req);

        res.status(status).send({message, banner});
    } catch (error) {
        console.log('Error in adminDeleteBannerController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while deleting the banner.', error, {banner: {}});
    }
}