const sharp = require("sharp");

const generateThumbnail = (req, res, next) => {
  if (req.files) {
    if (Object.keys(req.files).length !== 0) {
      let { photo } = req.files;
      photo = photo[0];
      if (photo) {
        try {
          sharp(photo.path)
            .resize(100, 100)
            .toFile(
              "./uploads/thumbnails/" + photo.filename,
              (err, resizeImage) => {
                if (err) {
                  return next(err);
                }
              }
            );
          req.thumbnail = photo.filename;
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
