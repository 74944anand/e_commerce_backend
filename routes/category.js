const express = require('express')
const router = express.Router()
const { errorWrapper } = require('../utils/error')
const { validateError } = require('../utils/validateError')
const categoryController = require('../controller/category')
const { addCategory,validateId } = require('../validation/category');
const { checkPermission } = require('../middleware/checkPermission')
const { checkAuth } = require('../middleware/checkAuth')

//Categories
router.get('/', errorWrapper(categoryController.getCategory))
router.get('/:id', validateId, validateError, errorWrapper(categoryController.getCategoryById))
router.post('/', addCategory, validateError, checkAuth, errorWrapper(categoryController.addCategory))
router.put('/:id',validateId, validateError, checkAuth, errorWrapper(categoryController.updateCategoryById))
router.delete('/:id', validateId, validateError, checkAuth, errorWrapper(categoryController.deleteCategoryById))



module.exports = router