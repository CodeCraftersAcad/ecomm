const User = require('../../../models/UserModel');
const Favorite = require('../../../models/FavoritesModel');
const Product = require('../../../models/ProductModel');
const Service = require('../../../models/ServicesModel');
const errorHandler = require('../../../utils/error-handler/controller-errors');

/*
  * Description: This service will add/remove a product from user's favorites.
  * File Usage: /controllers/user-auth-controllers/user-auth-favorites-controller.js
  * Params: productId, userId, req
*/
exports.addRemoveProductFromFavoritesService = async (productId, userId, req) => {
    try {
        const user = await User.findById(userId);
        if (!user) return { status: 404, message: 'User does not exist.', favorites: [] };

        const favorites = await Favorite.findOne({ user });

        const product = await Product.findById(productId);
        if (!product) return { status: 404, message: 'Product does not exist.', favorites: [] };

        if (!favorites) {
            const newFavorites = new Favorite({ user: user._id });
            newFavorites.products.push(product);
            await newFavorites.save();

            user.favorites.push(newFavorites);
            await user.save();
        } else {
            const isProductInFavorites = favorites.products.includes(productId);
            if (isProductInFavorites) {
                favorites.products.pull(productId);
                await favorites.save();

                user.favorites.pull(favorites);
                await user.save();

                const updatedUser = await User.findById(userId).populate('favorites');
                return { status: 200, message: 'Product removed from favorites.', favorites: updatedUser.favorites };
            } else {

                favorites.products.push(productId);
                await favorites.save();

                user.favorites.push(favorites);
                await user.save();
            }
        }

        const updatedUser = await User.findById(userId).populate('favorites');
        return { status: 200, message: 'Product added to favorites.', favorites: updatedUser.favorites };
    } catch (error) {
        console.log('Error in addProductToUserFavoritesService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: error.message,
            favorites: []
        };
    }
}

/*
  * Description: This service will add/remove a service from user's favorites.
  * File Usage: /controllers/user-auth-controllers/user-auth-favorites-controller.js
  * Params: serviceId, userId, req
*/
exports.addRemoveServiceFromFavoritesService = async (serviceId, userId, req) => {
    try {
        const user = await User.findById(userId);
        if (!user) return { status: 404, message: 'User does not exist.', favorites: [] };

        const favorites = await Favorite.findOne({ user });

        const service = await Service.findById(serviceId);
        if (!service) return { status: 404, message: 'Service does not exist.', favorites: [] };

        if (!favorites) {
            const newFavorites = new Favorite({ user: user._id });
            newFavorites.services.push(service);
            await newFavorites.save();

            user.favorites.push(newFavorites);
            await user.save();
        } else {
            const isServiceInFavorites = favorites.services.includes(serviceId);
            if (isServiceInFavorites) {
                favorites.services.pull(serviceId);
                await favorites.save();

                user.favorites.pull(favorites);
                await user.save();

                const updatedUser = await User.findById(userId).populate('favorites');
                return { status: 200, message: 'Service removed from favorites.', favorites: updatedUser.favorites };
            } else {
                favorites.services.push(serviceId);
                await favorites.save();

                user.favorites.push(favorites);
                await user.save();
            }
        }

        const updatedUser = await User.findById(userId).populate('favorites');
        return { status: 200, message: 'Service added to favorites.', favorites: updatedUser.favorites };
    } catch (error) {
        console.log('Error in addRemoveServiceFromFavoritesService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: error.message,
            favorites: []
        };
    }
}
