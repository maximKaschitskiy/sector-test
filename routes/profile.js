const profileRouter = require("express").Router();
const { generateThumbnail } = require("../middlewares/thumbnail");
const { getFormData, fileExist } = require("../middlewares/upload");
const { editUserValidation } = require("../utils/validation");
const { editProfile, getProfile } = require("../controllers/profile");
const { verifyID } = require("../middlewares/verifyID");

profileRouter.put(
  "/:id",
  verifyID,
  fileExist,
  getFormData,
  editUserValidation,
  generateThumbnail,
  editProfile
);

profileRouter.get("/:id", getProfile);

module.exports = profileRouter;
