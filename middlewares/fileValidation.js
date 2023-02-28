const multer = require("multer");
const path = require("path");

const { mimetypes, format } = require('../consts/validValues');
const { BadRequest } = require('../errors/badRequest');

const fileFilter = (req, file, callback) => {
  const fileSize = parseInt(req.headers["content-length"])
  const ext = path.extname(file.originalname).toLowerCase();
    if (!mimetypes.includes(file.mimetype)) {
      return callback(new BadRequest('Invalid mimetype'));
    }
    if (!format.includes(ext)) {
      return callback(new BadRequest('Invalid file format'));
    }
    if (fileSize >= 10485760) {
      return callback(new BadRequest('Too big'));
    }
    return callback(null, true);
};

module.exports = { fileFilter };