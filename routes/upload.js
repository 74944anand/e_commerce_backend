const express = require('express')
const router = express.Router()
const {errorWrapper} = require('../utils/error')
const {checkAuth} = require('../middleware/checkAuth')
const uploadController = require('../controller/upload');


router.post('/single', checkAuth, upload.single('file'), errorWrapper(uploadController.singleUpload));
router.post('/multiple', checkAuth,upload.array('files', 10), errorWrapper(uploadController.multipleUpload));


module.exports = router