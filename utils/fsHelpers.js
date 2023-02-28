const fs = require("fs");
const path = require("path");
const { format } = require("../consts/validValues");

const delFileIfExist = (req) => {
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
}

const createFolderIfNotExist = () => {
    const paths = ['./uploads/originals', './uploads/thumbnails'];
    paths.forEach((item)=> {
        console.log(fs.existsSync(item));
        if (!fs.existsSync(item)){
            fs.mkdirSync(item, { recursive: true });
        }
    })
}

module.exports = {
    delFileIfExist, createFolderIfNotExist
  };
  