const { body } = require('express-validator');

exports.validateUser = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email-templates address'),
    body('phone').optional().trim().isMobilePhone('any').withMessage('Invalid phone number'),
    body('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('address.street').optional().trim().notEmpty().withMessage('Street is required'),
    body('address.city').optional().trim().notEmpty().withMessage('City is required'),
    body('address.state').optional().trim().notEmpty().withMessage('State is required'),
    body('address.zip').optional().trim().notEmpty().withMessage('ZIP code is required'),
];

