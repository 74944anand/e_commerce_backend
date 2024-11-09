const { param, body } = require("express-validator")


exports.addCategory = [
    body('name').notEmpty().withMessage('name is required').trim(),
    body('description').notEmpty().withMessage('description is required').trim(),
    body('isAvailable').notEmpty().withMessage('isAvailable is required').trim(),


]

exports.validateId = [
    param('id').notEmpty().withMessage('id is required parameter').matches(/^\d+$/).withMessage('Invalid integer format in parameter'),
]