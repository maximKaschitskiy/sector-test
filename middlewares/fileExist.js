const path = require("path");
const fs = require("fs");
const { format } = require("../consts/validValues");

const fileExist = (req, res, next) => {
  if (req.photoExt) {
    const photoExt = "." + req.photoExt;
    const filesList = format
      .filter((item) => item !== photoExt)
      .forEach((ext) => {
        const existOrig = fs.existsSync(
          "./uploads/originals/" + req.user.id + ext,
          fs.F_OK
        );
        const existThumb = fs.existsSync(
          "./uploads/thumbnails/" + req.user.id + ext,
          fs.F_OK
        );
        if (existOrig === true) {
          fs.unlinkSync("./uploads/originals/" + req.user.id + ext);
        }
        if (existThumb === true) {
          fs.unlinkSync("./uploads/thumbnails/" + req.user.id + ext);
        }
      });
  }
  next();
};

module.exports = {
  fileExist,
};
