const { body, validationResult } = require('express-validator');

const taskValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').optional().isLength({ max: 100 }).withMessage('Description cannot exceed 100 characters'),
    body('done').optional().isBoolean().withMessage('Done must be a boolean value'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = taskValidator;