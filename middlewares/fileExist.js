const { delFileIfExist } = require("../utils/fsHelpers");

const fileExist = (req, res, next) => {
  delFileIfExist(req);
  next();
};

module.exports = {
  fileExist,
};
