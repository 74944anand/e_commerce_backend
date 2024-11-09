const express = require('express')
const router = express.Router()
const { errorWrapper } = require('../utils/error')
const reportController = require('../controller/report')
const { checkPermission } = require('../middleware/checkPermission')
const { checkAuth } = require('../middleware/checkAuth')

router.get('/', checkAuth,checkPermission,errorWrapper(reportController.getReport))

module.exports= router;