const express = require('express')
const router = express.Router()
const {errorWrapper} = require('../utils/error')
const authController = require('../controller/auth')
const {loginValidation} = require('../validation/auth')
const {validateError} = require('../utils/validateError')
const {checkAuth} = require('../middleware/checkAuth')


router.post('/login', loginValidation,validateError,errorWrapper(authController.login)) 
router.get('/logout',checkAuth,validateError, errorWrapper(authController.logout)) 
router.post("/forgot-password",validateError, errorWrapper(authController.forgotPassword));
router.post("/verify-otp",validateError, errorWrapper(authController.verifyOtp));
router.post("/reset-password",validateError, errorWrapper(authController.resetPassword));


module.exports = router