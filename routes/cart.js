const express = require('express')
const router = express.Router()
const { errorWrapper } = require('../utils/error')
const { validateError } = require('../utils/validateError')
const { addCart,validateId } = require('../validation/cart');
const cartController = require('../controller/cart')
const { checkPermission } = require('../middleware/checkPermission')
const { checkAuth } = require('../middleware/checkAuth')

router.get('/', checkAuth,errorWrapper(cartController.getCart))
router.post('/', validateError, checkAuth, errorWrapper(cartController.addToCart))
router.put('/', validateError, checkAuth, errorWrapper(cartController.updateCartById))
router.delete('/', validateId, validateError, checkAuth, errorWrapper(cartController.deleteCart))
router.delete('/:productId' , validateError, checkAuth, errorWrapper(cartController.deleteCartItem))




module.exports = router