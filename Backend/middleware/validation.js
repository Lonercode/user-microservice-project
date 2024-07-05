const {body} = require('express-validator')

const validationCriteria = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('country').notEmpty().withMessage('Country is required')
];

const validationCriteriaNoPassword = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('country').notEmpty().withMessage('Country is required')
]


module.exports = {
    validationCriteria,
    validationCriteriaNoPassword,
}