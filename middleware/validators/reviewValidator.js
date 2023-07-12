const { body } = require('express-validator');

exports.validateUserReview = [
    body('rating').trim().notEmpty().withMessage('Rating is required').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('Comment is required').isLength({ max: 300 }).withMessage('Comment must be less than 300 characters'),
];
