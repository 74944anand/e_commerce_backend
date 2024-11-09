const { param, body } = require("express-validator")

exports.addUserJobs = [
    body('jobId').notEmpty().withMessage('jobId is required parameter').matches(/^\d+$/).withMessage('Invalid integer format in permissionId'),
]

exports.updateUserJobs = [
    param('id').notEmpty().withMessage('id is required parameter').matches(/^\d+$/).withMessage('Invalid integer format in parameter'),
    body('jobId').notEmpty().withMessage('jobId is required parameter').matches(/^\d+$/).withMessage('Invalid integer format in permissionId'),
    body('userId').notEmpty().withMessage('userId is required parameter').matches(/^\d+$/).withMessage('Invalid integer format in permissionId'),

]
exports.validateId = [
    param('id').notEmpty().withMessage('id is required parameter').matches(/^\d+$/).withMessage('Invalid integer format in parameter'),

]

