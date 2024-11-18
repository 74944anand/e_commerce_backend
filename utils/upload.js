const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/upload/'); // Folder to store uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
  });

  expots.upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit to 5 MB
    fileFilter: function (req, file, cb) {
      const fileTypes = /jpeg|jpg|png|gif/;
      const mimeType = fileTypes.test(file.mimetype);
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
      if (mimeType && extName) {
        return cb(null, true);
      }
      cb(new Error('File type not supported'));
    },
  });