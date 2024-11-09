const express = require('express')
const router = express.Router()
const { errorWrapper } = require('../utils/error')
const { validateError } = require('../utils/validateError')
const { addCart,validateId } = require('../validation/cart');
const orderController = require('../controller/order')
const { checkPermission } = require('../middleware/checkPermission')
const { checkAuth } = require('../middleware/checkAuth');
const verifyPayment = require('../middleware/verifyPayment');

router.get('/', checkAuth,errorWrapper(orderController.getOrders))
router.get('/transactions', checkAuth, errorWrapper(orderController.getUserTransaction))

//Order and its verification
router.post('/', validateError, checkAuth, errorWrapper(orderController.createOrder))
router.post('/verify', verifyPayment, validateError, errorWrapper(orderController.verifyOrder))


module.exports = router