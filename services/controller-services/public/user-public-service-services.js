const Service = require('../../../models/ServicesModel');
const generateServiceQuery = require('../../../utils/db-queries/public/public-service-query');
const errorHandler = require('../../../utils/error-handler/controller-errors');

exports.getPublicServicesService = async (reqQuery, req) => {
    const { query, pageOptions, skip } = generateServiceQuery(reqQuery);
    try {
        const services = await Service.find(query)
            .skip(skip)
            .limit(pageOptions.limit);

        return {
            status: 200,
            message: 'Services fetched successfully.',
            services,
        };
    } catch (error) {
        console.log('Error in getPublicServicesService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while fetching services. In getPublicServicesService',
            services: [],
        }
    }
};
