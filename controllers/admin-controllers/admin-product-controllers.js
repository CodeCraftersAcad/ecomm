const {
    adminGetProductsService,
    adminCreateProductService,
    adminUpdateProductService,
    adminDeleteProductService
} = require('../../services/controller-services/admin/admin-product-services');
const errorHandler = require('../../utils/error-handler/controller-errors');
const {sendErrorResponse} = require('../../utils/error-handler/error-response');

/*
  * Description: Admin controller to get all products
 */
exports.adminGetProducts = async (req, res) => {
    let query = req.query;

    try {
        const {status, message, products} = await adminGetProductsService(query, req);

        res.status(status).send({message, products});
    } catch (error) {
        console.log('Error in getProductsController');
        await errorHandler(error, req, res);
        sendErrorResponse(res, 'An error occurred while fetching products.', {products: []});
    }
}

/*
  * Description: Admin controller to create a product
*/
exports.adminCreateProduct = async (req, res) => {
    let newProduct = req.body;

    try {
        const {status, message, product} = await adminCreateProductService(newProduct, req);

        res.status(status).send({message, product});
    } catch (error) {
        console.log('Error in createProductController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while creating the product.', error, {product: {}});
    }
}

/*
  * Description: Admin controller to update a product
*/
exports.adminUpdateProduct = async (req, res) => {
    let updatedProduct = req.body;
    let {productId} = req.params;

    try {
        const {status, message, product} = await adminUpdateProductService(updatedProduct, productId, req);

        res.status(status).send({message, product});
    } catch (error) {
        console.log('Error in updateProductController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while updating the product.', error, {product: {}});
    }
}

/*
  * Description: Admin controller to delete a product
*/
exports.adminDeleteProduct = async (req, res) => {
    let {productId} = req.params;

    try {
        const {status, message, product} = await adminDeleteProductService(productId, req);

        res.status(status).send({message, product});
    } catch (error) {
        console.log('Error in deleteProductController');
        await errorHandler(error, req);
        sendErrorResponse(res, 'An error occurred while deleting the product.', error, {product: {}});
    }
}