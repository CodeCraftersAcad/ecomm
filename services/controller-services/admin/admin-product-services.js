const Product = require('../../../models/ProductModel');
const errorHandler = require('../../../utils/error-handler/controller-errors');
const {adminProductQuery} = require('../../../utils/db-queries/admin/admin-product-query');

/*
  * Description: Admin service worker to get all products
  * File Usage: /controllers/admin-controllers/admin-controllers-product-controllers.js
  * Query params: reqQuery (req.query)
*/
exports.adminGetProductsService = async (reqQuery, req) => {
    try {
        const query = await adminProductQuery(reqQuery);

        let products = await Product.find(query);

        return {
            status: 200,
            message: 'Products fetched successfully.',
            products,
        }
    } catch (error) {
        console.log('Error in getProductsService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while fetching products. In getProductsService',
            products: [],
        }
    }
}

/*
  * Description: Admin service worker to create a product
  * File Usage: /controllers/admin-controllers/admin-controllers-product-controllers.js
  * Body params: newProductBody (req.body)
*/
exports.adminCreateProductService = async (newProductBody, req) => {
    try {
        const existingProduct = await Product.findOne({name: newProductBody.name});
        if (existingProduct) {
            return {
                status: 200,
                message: 'Product with same name already exists.',
                product: {}
            }
        }

        let newProduct = await Product.create(newProductBody);
        if (!newProduct)
            return {
                status: 400,
                message: 'Product could not be created.',
                product: {}
            }

        return {
            status: 201,
            message: 'Product created successfully.',
            product: newProduct,
        }
    } catch (error) {
        console.log('Error in createProductService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while creating the product. In createProductService',
            product: {},
        }
    }
}

/*
  * Description: Admin service worker to update a product
  * File Usage: /controllers/admin-controllers/admin-controllers-product-controllers.js
  * Body params: updatedProductBody (req.body)
*/
exports.adminUpdateProductService = async (updatedProductBody, productId, req) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updatedProductBody,
            {new: true, useFindAndModify: false}
        );

        if (!updatedProduct) {
            return {
                status: 404,
                message: 'Product not found.',
                product: {},
            };
        }

        return {
            status: 200,
            message: 'Product updated successfully.',
            product: updatedProduct,
        };
    } catch (error) {
        console.log('Error in updateProductService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while updating the product. In updateProductService',
            product: {},
        }
    }
}

/*
  * Description: Admin service worker to delete a product
  * File Usage: /controllers/admin-controllers/admin-controllers-product-controllers.js
  * Params: productId (req.params)
*/
exports.adminDeleteProductService = async (productId, req) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return {
                status: 404,
                message: 'Product not found.',
                product: {},
            };
        }

        return {
            status: 200,
            message: 'Product deleted successfully.',
            product: deletedProduct,
        };
    } catch (error) {
        console.log('Error in deleteProductService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while deleting the product. In deleteProductService',
            product: {},
        }
    }
}