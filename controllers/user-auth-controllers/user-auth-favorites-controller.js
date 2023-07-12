const {addRemoveProductFromFavoritesService, addRemoveServiceFromFavoritesService} = require('../../services/controller-services/user-auth/user-auth-favorites-service');
const errorHandler = require('../../utils/error-handler/controller-errors');

/*
  * Description: This controller will add/remove a product from user's favorites.
*/
exports.addRemoveProductFromFavoritesController = async (req, res) => {
    try {
        const {productId} = req.params;
        const userId = req.user.id;

        const {status, message, favorites} = await addRemoveProductFromFavoritesService(productId, userId, req);
        res.status(status).send({message, favorites});
    } catch (error) {
        console.log('Error in addRemoveProductFromFavoritesController');
        await errorHandler(error, req);
        res.status(500).send({message: 'An error occurred while adding/removing the product from favorites.'});
    }
}

/*
  * Description: This controller will add/remove a service from user's favorites.
*/
exports.addRemoveServiceFromFavoritesController = async (req, res) => {
    try {
        const {serviceId} = req.params;
        const userId = req.user.id;

        const {status, message, favorites} = await addRemoveServiceFromFavoritesService(serviceId, userId, req);
        res.status(status).send({message, favorites});
    } catch (error) {
        console.log('Error in addRemoveServiceFromFavoritesController');
        await errorHandler(error, req);
        res.status(500).send({message: 'An error occurred while adding/removing the service from favorites.'});
    }
}
