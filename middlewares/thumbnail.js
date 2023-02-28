const sharp = require("sharp");

const generateThumbnail = (req, res, next) => {
  if (req.files) {
    if (Object.keys(req.files).length !== 0) {
      let { file } = req.files;
      file = file[0];
      if (file) {
        try {
          sharp(file.path)
            .resize(100, 100)
            .toFile(
              "./uploads/thumbnails/" + file.filename,
              (err, resizeImage) => {
                if (err) {
                  return next(err);
                }
              }
            );
          req.thumbnail = file.filename;
          return next();
        } catch (err) {
          return next(err);
        }
      }
    }
  }
  return next();
};

module.exports = { generateThumbnail };
