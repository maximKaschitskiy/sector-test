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
    callback(null, req.user.ID + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const fileExist = (req, res, next) => {
  const filesList = format.forEach((ext) => {
    const existOrig = fs.existsSync(
      "./uploads/originals/" + req.user.ID + ext, fs.F_OK
    );
    const existThumb = fs.existsSync(
      "./uploads/thumbnails/" + req.user.ID + ext, fs.F_OK
    );
    if (existOrig === true) {
      fs.unlinkSync("./uploads/originals/" + req.user.ID + ext);
    }
    if (existThumb === true) {
      fs.unlinkSync("./uploads/thumbnails/" + req.user.ID + ext);
    }
  });
  next();
};

const getFormData = (req, res, next) => {
  upload.fields([
    { name: "file", maxCount: 1 },
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
            Object.keys(req.files).includes("file") &&
            Object.keys(req.files).length > 1
          ) {
            return next(new BadRequest("Text field must not contain file"));
          }
          let { file } = req.files;
          file = file[0];
          req.file = file.filename;
        }
      }
      return next(err);
    }
    next();
  });
};

module.exports = {
  getFormData,
  fileExist,
};
