const db = require('../models');

exports.saveFileDetails = async (file, userId) => {
    const result = await uploadData(file,userId);
  if (result && result.length) {
    return { success: true, message: "File Uploaded Sucessfully", data: result };
  } else {
    return { success: false, message: "File Upload Failed" };
  }
};

exports.saveMultipleFilesDetails = async (files, userId) => {
  const uploadPromises = files.map((file) =>
    uploadData(file, userId)
  );
  const result = await Promise.all(uploadPromises);

  if (result) {
    return { success: true, message: "File Uploaded Sucessfully", data: result };
  } else {
    return { success: false, message: "File Upload Failed" };
  }
};


const uploadData = async(file,userId) =>{
    const obj={
        originalName: file.originalname,
        storedName: file.filename,
        filePath: file.path,
        mimeType: file.mimetype,
        fileSize: file.size,
        uploadedBy: userId,
    }
    return result = await db.upload.create(obj);
}