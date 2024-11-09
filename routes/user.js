const express = require('express')
const router = express.Router()
const { errorWrapper } = require('../utils/error')
const userController = require('../controller/user')
const { createUser, validateId ,updateUser } = require('../validation/user')
const { validateError } = require('../utils/validateError')
const { checkPermission } = require('../middleware/checkPermission')
const { checkAuth } = require('../middleware/checkAuth')

router.get('/', checkAuth, checkPermission, errorWrapper(userController.getData))
router.get('/:id', validateId, validateError, checkAuth, checkPermission, errorWrapper(userController.getDataById))
router.post('/', createUser, validateError, checkAuth, checkPermission,errorWrapper(userController.addData))
router.post('/signup', createUser, validateError, errorWrapper(userController.addData))
router.put('/:id', updateUser, validateError, checkAuth, checkPermission, errorWrapper(userController.updateDataById))
router.delete('/:id', validateId, validateError, checkAuth, checkPermission, errorWrapper(userController.deleteDataById))
router.get("/applicants/all",checkAuth, checkPermission,errorWrapper(userController.getAllAppliedUsers))
router.get("/applicants/:id",validateId,checkAuth,checkPermission,errorWrapper(userController.getAplicantsForJob));



module.exports = router;