const { body } = require('express-validator');

exports.validateNote = [
    body('service').trim().notEmpty().withMessage('Service is required'),
    body('user').trim().notEmpty().withMessage('User is required'),
    body('currentSkinConcerns').optional().isArray().withMessage('Current skin concerns should be an array'),
    body('irritations').optional().isArray().withMessage('Irritations should be an array'),
    body('productsUsed').optional().isArray({ min: 1 }).withMessage('Products used should be an array'),
    body('productsUsed.*').optional().isMongoId().withMessage('Invalid product ID'),
    body('futureRecommendations.services').optional().isArray().withMessage('Future recommendations services should be an array'),
    body('futureRecommendations.products').optional().isArray().withMessage('Future recommendations products should be an array'),
    body('futureRecommendations.services.*').optional().isMongoId().withMessage('Invalid service ID'),
    body('futureRecommendations.products.*').optional().isMongoId().withMessage('Invalid product ID'),
    body('additionalNotes').optional().trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        next();
    }
];
