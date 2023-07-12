const { body } = require('express-validator');

exports.validateOrder = [
    body('user').trim().notEmpty().withMessage('User is required'),
    body('products').isArray({ min: 1 }).withMessage('Products should be an array with at least one item'),
    body('products.*.product').trim().notEmpty().withMessage('Product is required'),
    body('products.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    body('total').isNumeric().withMessage('Total must be a numeric value'),
    body('status').optional().isIn(['pending', 'processing', 'pickup', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid order status'),
    body('pickup').optional().isBoolean().withMessage('Pickup must be a boolean value'),
    body('shippingAddress').optional().isObject().withMessage('Shipping address must be an object'),
    body('shippingAddress.street').optional().trim(),
    body('shippingAddress.city').optional().trim(),
    body('shippingAddress.state').optional().trim(),
    body('shippingAddress.zip').optional().trim(),
    body('shippingAddress.country').optional().trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        next();
    }
];
