const uploadService = require('../service/upload');

exports.singleUpload = async (req, res) => {
    const userId=req.decoded?.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await uploadService.saveFileDetails(file, userId);
    if (result.success) {
        return response.ok(res, {...result})
    }else {
        return response.noData(res, {...result})
      }
};

exports.multipleUpload = async (req, res) => {
    const userId=req.decoded?.id;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const result = await uploadService.saveMultipleFilesDetails(files, userId);
    if (result.success) {
        return response.ok(res, {...result})
    }else {
        return response.noData(res, {...result})
      }
};

