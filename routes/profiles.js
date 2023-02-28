const profilesRouter = require("express").Router();
const { getAllProfiles } = require("../controllers/profiles");

profilesRouter.get("/", getAllProfiles);

module.exports = profilesRouter;