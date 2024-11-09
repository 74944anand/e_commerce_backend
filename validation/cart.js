const { param, body } = require("express-validator")


exports.addCart = [
    body('productId').notEmpty().withMessage('ProductId is required').trim(),
    body('quantity').notEmpty().withMessage('Quantity is required').trim(),


]

exports.validateId = [
    param('id').notEmpty().withMessage('id is required parameter').matches(/^\d+$/).withMessage('Invalid integer format in parameter'),
]