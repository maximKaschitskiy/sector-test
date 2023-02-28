const profileRouter = require("express").Router();
const { generateThumbnail } = require("../middlewares/thumbnail");
const { getFormData } = require("../middlewares/upload");
const { fileExist } = require("../middlewares/fileExist");
const { editUserValidation } = require("../utils/validation");
const { editProfile, getProfile } = require("../controllers/profile");

profileRouter.put(
  "/:id",
  getFormData,
  editUserValidation,
  generateThumbnail,
  fileExist,
  editProfile
);

profileRouter.get("/:id", getProfile);

module.exports = profileRouter;
