const { BadRequest } = require("../errors/badRequest");
const { Forbidden } = require("../errors/forbidden");
const { NotFound } = require("../errors/notFound");
const { Conflict } = require("../errors/conflict");
const { db, sequelize, Profiles } = require("../utils/db");
const { fileTypes, reqValues } = require("../consts/validValues");
const { emptyQuery } = require("../utils/emptyQuery");
const { filledValues, requiredValues } = require("../utils/filterObj");

const editProfile = async (req, res, next) => {
  const id = req.user.id;
  const { user, email, name, surname, gender } = req.body;
  const { thumbnail, photo } = req;
  const query = {
    user: user,
    email: email,
    name: name,
    surname: surname,
    gender: gender,
    thumbnail: thumbnail,
    photo: photo,
  };
  if (emptyQuery(Object.values(query))) {
    return next(new BadRequest("Empty request"));
  }
  sequelize
    .sync()
    .then(async () => {
      const dbQuery = await Profiles.update(
        query,
        { where: {
            id: id,
          },
        }
      )
      .then((sqlRes) => {
        const [resObj] = requiredValues([query], reqValues);
        return res
          .status(200)
          .send(resObj);
      })
      .catch((error) => {
        return next(error.original);
      });
    })
    .catch((error) => {
      return next(error);
    });
};

const getProfile = async (req, res, next) => {
  const id = req.params.id;
  sequelize
    .sync()
    .then(async () => {
      const dbQuery = await Profiles.findOne({
        where: {
          id: id,
        },
      })
      .then((sqlRes) => {
        if (sqlRes == null) {
          return res
            .status(200)
            .send(requiredValues([]));
        }
        const [resObj] = requiredValues([sqlRes.dataValues], reqValues);
        return res
          .status(200)
          .send(resObj);
      })
      .catch((error) => {
        return next(error);
      });
    })
    .catch((error) => {
      return next(error);
    });
};

const getAllProfiles = async (req, res, next) => {
  const limit = 10;
  const offset = (req.query.page - 1) * 10;
  if (offset < 0 || typeof offset !== "number") {
    return next(new BadRequest("Invalid query parameter"));
  }
  sequelize
    .sync()
    .then(async () => {
      const dbQuery = await Profiles.findOne({
        where: {
          id: id,
        },
        limit: limit,
        offset: offset,
      })
      .then((sqlRes) => {
        if (sqlRes == null) {
          return res
            .status(200)
            .send(requiredValues([]));
        }
        return res
          .status(200)
          .send(requiredValues([sqlRes.dataValues], reqValues));
      })
      .catch((error) => {
        return next(error);
      });
    })
    .catch((error) => {
      return next(error);
    });
};

module.exports = {
  editProfile,
  getProfile,
  getAllProfiles,
};