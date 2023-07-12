const {
    adminGetServicesService,
    adminCreateServiceService,
    adminUpdateServiceService,
    adminDeleteServiceService
} = require('../../services/controller-services/admin/admin-services-service');
const errorHandler = require('../../utils/error-handler/controller-errors');
const {sendErrorResponse} = require('../../utils/error-handler/error-response');

/*
  * Description: Admin controller to get all services
*/
exports.adminGetServicesController = async (req, res) => {
    try {
        const {status, message, services} = await adminGetServicesService(req.query, req);
        if (status && status !== 200) return res.status(status).send({
            message,
            services
        });

        res.status(status).send({message, services});
    } catch (error) {
        console.log('Error in adminGetServicesController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while fetching services.', error, {services: []});
    }
};

/*
  * Description: Admin controller to create a service
*/
exports.adminCreateServiceController = async (req, res) => {
    try {
        const {status, message, service} = await adminCreateServiceService(req.body, req);
        if (status && status !== 201) return res.status(status).send({
            message,
            service
        });

        res.status(status).send({message, service});
    } catch (error) {
        console.log('Error in adminCreateServiceController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while creating the service.', error, {service: {}});
    }
};

/*
  * Description: Admin controller to update a service
*/
exports.adminUpdateServiceController = async (req, res) => {
    const {serviceId} = req.params;
    console.log('serviceId', serviceId)
    try {
        const {status, message, service} = await adminUpdateServiceService(serviceId, req.body, req);

        res.status(status).send({message, service});
    } catch (error) {
        console.log('Error in adminUpdateServiceController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while updating the service.', error, {service: {}});
    }
};

/*
  * Description: Admin controller to delete a service
*/
exports.adminDeleteServiceController = async (req, res) => {
    const {serviceId} = req.params;
    try {
        const {status, message, service} = await adminDeleteServiceService(serviceId, req);

        res.status(status).send({message, service});
    } catch (error) {
        console.log('Error in adminDeleteServiceController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while deleting the service.', error, {service: {}});
    }
};
