const {getPublicServicesService} = require('../../services/controller-services/public/user-public-service-services');
const {sendErrorResponse} = require('../../utils/error-handler/error-response');
const errorHandler = require('../../utils/error-handler/controller-errors');

exports.getPublicServicesController = async (req, res) => {
    try {
        const {status, message, services} = await getPublicServicesService(req.query, req);

        res.status(status).send({message, services});
    } catch (error) {
        console.log('Error in getPublicServicesController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while fetching the services.', {services: []});
    }
}