const Banner = require('../../../models/BannerModel');
const generateBannerQuery = require('../../../utils/db-queries/admin/admin-banner-query');
const errorHandler = require('../../../utils/error-handler/controller-errors');

/*
  * Description: Admin service worker to get all banners
  * File Usage: /controllers/admin-controllers/banner-controllers.js
  * Params: reqQuery (req.query)
*/
exports.adminGetBannersService = async (reqQuery, req) => {
    try {
        const query = generateBannerQuery(reqQuery);

        let banners = await Banner.find(query).sort({createdAt: -1});

        return {
            status: 200,
            message: 'Banners fetched successfully.',
            banners,
        }
    } catch (error) {
        console.log('Error in getBannersService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while fetching banners. In getBannersService',
            banners: [],
        }
    }
}

/*
  * Description: Admin service worker to create a banner
  * File Usage: /controllers/admin-controllers/banner-controllers.js
  * Params: bannerBody (req.body)
*/
exports.adminCreateBannerService = async (bannerBody, req) => {
    try {
        const banner = await Banner.findOne({name: bannerBody.name});
        if (banner) {
            return {
                status: 200,
                message: 'Banner with same name already exists.',
                banner: {}
            }
        }

        let newBanner = await Banner.create(bannerBody);
        if (!newBanner)
            return {
                status: 400,
                message: 'Banner could not be created.',
                banner: {}
            }

        return {
            status: 201,
            message: 'Banner created successfully.',
            banner: newBanner,
        }
    } catch (error) {
        console.log('Error in createBannerService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while creating the banner. In createBannerService',
            banner: {},
        }
    }
}

/*
  * Description: Admin service worker to update a banner
  * File Usage: /controllers/admin-controllers/banner-controllers.js
  * Params: bannerId (req.params) bannerBody (req.body)
*/
exports.adminUpdateBannerService = async (bannerId, bannerBody, req) => {
    try {
        const banner = await Banner.findOneAndUpdate({_id: bannerId}, bannerBody, {new: true});
        if (!banner)
            return {
                status: 400,
                message: 'Banner could not be updated.',
                banner: {}
            }

        return {
            status: 200,
            message: 'Banner updated successfully.',
            banner,
        }

    } catch (error) {
        console.log('Error in updateBannerService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while updating the banner. In updateBannerService',
            banner: {},
        }
    }
}

/*
  * Description: Admin service worker to delete a banner
  * File Usage: /controllers/admin-controllers/banner-controllers.js
  * Params: bannerId (req.params)
*/
exports.adminDeleteBannerService = async (bannerId, req) => {
    try {
        const banner = await Banner.findOneAndDelete({_id: bannerId});
        if (!banner)
            return {
                status: 400,
                message: 'Banner could not be deleted.',
                banner: {}
            }

        return {
            status: 200,
            message: 'Banner deleted successfully.',
            banner,
        }

    } catch (error) {
        console.log('Error in deleteBannerService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while deleting the banner. In deleteBannerService',
            banner: {},
        }
    }
}
