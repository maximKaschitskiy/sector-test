const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { nanoid } = require("nanoid");
const { fileFilter } = require("../middlewares/fileValidation");
const { BadRequest } = require("../errors/badRequest");
const { format } = require("../consts/validValues");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/originals");
  },
  filename: (req, file, callback) => {
    callback(null, req.user.id + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const getFormData = (req, res, next) => {
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "email" },
    { name: "name" },
    { name: "surname" },
    { name: "gender" },
  ])(req, res, (err) => {
    if (err) {
      if (req.files) {
        if (Object.keys(req.files).length !== 0) {
          if (Object.keys(req.files).length > 1) {
            return next(new BadRequest("Too many files"));
          }
          if (
            Object.keys(req.files).includes("photo") &&
            Object.keys(req.files).length > 1
          ) {
            return next(new BadRequest("Text field must not contain file"));
          }
        }
      }
      if(err.code === 'LIMIT_UNEXPECTED_FILE') {
        return next(new BadRequest("Unexpected field"));
      }
      return next(err);
    }
    if (req.files) {
      if (Object.keys(req.files).length !== 0) {
        let { photo } = req.files;
        photo = photo[0];
        req.photo = photo.filename;
        req.photoExt = photo.filename.split(".").pop();
      }
    }
    return next();
  });
};

module.exports = {
  getFormData,
};
