const { param, body } = require("express-validator")


exports.addRole = [
    body('roleName').notEmpty().withMessage('roleName is required').trim(),
    body('roleDescription').notEmpty().withMessage('roleDescription is required').trim(),
]

exports.updateRole = [
    param('id').notEmpty().withMessage('id is required parameter').matches(/^\d+$/).withMessage('Invalid integer format in parameter'),
]

exports.validateId = [
    param('id').notEmpty().withMessage('id is required parameter').matches(/^\d+$/).withMessage('Invalid integer format in parameter'),
]