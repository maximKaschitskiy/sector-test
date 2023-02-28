const { BadRequest } = require("../errors/badRequest");
const { Forbidden } = require("../errors/forbidden");
const { NotFound } = require("../errors/notFound");
const { Conflict } = require("../errors/conflict");
const { db, sequelize, Profiles } = require("../utils/db");
const { fileTypes, reqValues } = require("../consts/validValues");
const { emptyQuery } = require("../utils/emptyQuery");
const { filledValues, requiredValues } = require("../utils/filterObj");

const getAllProfiles = async (req, res, next) => {
  const limit = 10;
  const offset = (req.query.page - 1) * 10;
  if (offset < 0 || typeof offset !== "number") {
    return next(new BadRequest("Invalid query parameter"));
  }
  sequelize
    .sync()
    .then(async () => {
      const dbQuery = await Profiles.findAll({
        limit: limit,
        offset: offset,
      })
      .then((sqlRes) => {
        if (sqlRes == null) {
          return res
            .status(200)
            .send(requiredValues([]));
        }
        const sqlResArr = sqlRes.map(item => item.dataValues);
        return res
          .status(200)
          .send(requiredValues(sqlResArr, reqValues));
      })
      .catch((error) => {
        return next("Failed to retrieve data");
      });
    })
    .catch((error) => {
      return next("Unable to create table");
    });
};

module.exports = {
  getAllProfiles,
};