const Services = require('../../../models/ServicesModel');
const generateServiceQuery = require('../../../utils/db-queries/admin/admin-services-query');
const errorHandler = require('../../../utils/error-handler/controller-errors');

/*
  * Description: Admin service worker to get all services
  * File Usage: /controllers/admin-controllers/admin-controllers-services-controller.js
  * Params: reqQuery (req.query)
 */
exports.adminGetServicesService = async (reqQuery, req) => {
    try {
        const query = generateServiceQuery(reqQuery);

        let services = await Services.find(query);

        return {
            status: 200,
            message: 'Services fetched successfully.',
            services,
        }
    } catch (error) {
        console.log('Error in getServicesService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while fetching services. In getServicesService',
            services: [],
        }
    }
}

/*
  * Description: Admin service worker to create a service
  * File Usage: /controllers/admin-controllers/admin-controllers-services-controller.js
  * Params: serviceBody (req.body)
*/
exports.adminCreateServiceService = async (serviceBody, req) => {
    try {
        const serviceExists = await Services.findOne({name: serviceBody.name});
        if (serviceExists) {
            return {
                status: 400,
                message: 'Service with same name already exists.',
                service: {}
            }
        }

        let newService = await Services.create(serviceBody);
        if (!newService)
            return {
                status: 400,
                message: 'Service could not be created.',
                service: {}
            }

        return {
            status: 201,
            message: 'Service created successfully.',
            service: newService,
        }
    } catch (error) {
        console.log('Error in createServiceService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while creating service. In createServiceService',
            service: {},
        }
    }
}

/*
  * Description: Admin service worker to update a service
  * File Usage: /controllers/admin-controllers/admin-controllers-services-controller.js
  * Params: serviceId (req.params) serviceBody (req.body)
*/
exports.adminUpdateServiceService = async (serviceId, serviceBody, req) => {
    try {
        const serviceToUpdate = await Services.findByIdAndUpdate({_id: serviceId}, serviceBody, {new: true});
        if (!serviceToUpdate) {
            return {
                status: 400,
                message: 'Service could not be updated.',
                service: {}
            }
        }

        return {
            status: 200,
            message: 'Service updated successfully.',
            service: serviceToUpdate,
        }
    } catch (error) {
        console.log('Error in updateServiceService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while updating service. In updateServiceService',
            service: {},
        }
    }
}

/*
  * Description: Admin service worker to delete a service
  * File Usage: /controllers/admin-controllers/admin-controllers-services-controller.js
  * Params: serviceId (req.params)
*/
exports.adminDeleteServiceService = async (serviceId, req) => {
    try {
        const serviceToDelete = await Services.findByIdAndDelete({_id: serviceId});
        if (!serviceToDelete) {
            return {
                status: 400,
                message: 'Service could not be deleted.',
                service: {}
            }
        }

        return {
            status: 200,
            message: 'Service deleted successfully.',
            service: serviceToDelete,
        }
    } catch (error) {
        console.log('Error in deleteServiceService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while deleting service. In deleteServiceService',
            service: {},
        }
    }
}
