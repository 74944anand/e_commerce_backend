const express = require('express')
const router = express.Router()
const { errorWrapper } = require('../utils/error')
const { validateError } = require('../utils/validateError')
const productController = require('../controller/product')
const { addProduct,updateProduct,validateId } = require('../validation/product');
const { checkPermission } = require('../middleware/checkPermission')
const { checkAuth } = require('../middleware/checkAuth')


//Products
router.get('/', errorWrapper(productController.getProductByCategoryId))
router.get('/:id', validateId, validateError, errorWrapper(productController.getProductById))
router.post('/', addProduct, validateError, checkAuth, errorWrapper(productController.addProduct))
router.put('/:id', validateId, validateError, checkAuth, errorWrapper(productController.updateProductById))
router.delete('/:id', validateId, validateError, checkAuth, errorWrapper(productController.deleteProductById))


module.exports = router