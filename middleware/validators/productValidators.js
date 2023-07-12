const { body, validationResult } = require('express-validator');

exports.validateProduct = [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('size').optional().trim(),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('usage').trim().notEmpty().withMessage('Usage is required'),
    body('stockStatus').optional().trim().isIn(['in stock', 'out of stock', 'backorder', 'discontinued']).withMessage('Invalid stock status'),
    body('brand').trim().notEmpty().withMessage('Brand is required'),
    body('images').optional().isArray({ min: 1 }).withMessage('Images should be an array'),
    body('images.*.defaultImage').optional().trim().isMongoId().withMessage('Invalid default image'),
    body('images.*.order').optional().isNumeric().withMessage('Invalid image order'),
    body('published').isBoolean().withMessage('Published is required and should be a boolean value'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('ingredients').optional().isArray().withMessage('Ingredients should be an array'),
    body('benefits').optional().isArray().withMessage('Benefits should be an array'),
    body('skinType').optional().isArray().withMessage('Skin types should be an array'),
    body('price').optional().isNumeric().withMessage('Invalid price'),
    body('salesPrice').optional().isNumeric().withMessage('Invalid sales price'),
    body('saleStartDate').optional().isISO8601().withMessage('Invalid sale start date'),
    body('saleEndDate').optional().isISO8601().withMessage('Invalid sale end date'),
    body('reviews').optional().isArray({ min: 0 }).withMessage('Reviews should be an array'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        next();
    }
];
