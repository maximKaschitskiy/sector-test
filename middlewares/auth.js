const jwt = require('jsonwebtoken');
const { db, sequelize, Profiles } = require("../utils/db");
const { JWT_MODE } = require('../utils/config.js');
const { Unauthorized } = require('../errors/unauthorized');
const { NotFound } = require('../errors/notFound');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  let token = null;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Invalid token'));
  }
  token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_MODE);
  } catch (err) {
    return next(new Unauthorized('Invalid token'));
  }
  console.log(payload);
  sequelize
    .sync()
    .then(async () => {
      const dbQuery = await Profiles.findOne({
        where: {
          id: payload.id,
        },
      })
      .then((sqlRes) => {
        if (!sqlRes) {
          return next(new Unauthorized('Invalid token'));
        }
        req.user = payload;
        return next();
      })
      .catch((error) => {
        return next(error);
      });
    })
    .catch((error) => {
      return next(error);
    });
};

module.exports = auth;
