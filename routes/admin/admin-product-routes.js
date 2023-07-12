const Router = require('express').Router();
const {userTokenAuth, authAdmin} = require('../../middleware/auth');

const {adminGetProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct} = require('../../controllers/admin-controllers/admin-product-controllers');

/*
  * Description: Admin route to get all products w/wo query.
  * Route: GET /api/admin-controllers/products
  * Access: Private (Admin)
  * Query params: none

  * Description: Admin route to create a new product.
  * Route: POST /api/admin-controllers/products
  * Access: Private (Admin)
  * Query params: none
*/
Router.route('/admin/products')
    .get(userTokenAuth, authAdmin, adminGetProducts)
    .post(userTokenAuth, authAdmin, adminCreateProduct);

/*
  * Description: Admin route to update a product.
  * Route: PUT /api/admin-controllers/products/:productId
  * Access: Private (Admin)
  * Query params: productId

  * Description: Admin route to delete a product.
  * Route: DELETE /api/admin-controllers/products/:productId
  * Access: Private (Admin)
  * Query params: productId
*/
Router.route('/admin-controllers/products/:productId')
    .put(userTokenAuth, authAdmin, adminUpdateProduct)
    .delete(userTokenAuth, authAdmin, adminDeleteProduct);

module.exports = Router;