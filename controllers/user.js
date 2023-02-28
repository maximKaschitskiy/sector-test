const { db, sequelize, Profiles } = require("../utils/db");
const bcrypt = require("bcrypt");
const moment = require("moment");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const { reqValues } = require("../consts/validValues");
const { requiredValues } = require("../utils/filterObj");
const { NotFound } = require("../errors/notFound");
const { Conflict } = require("../errors/conflict");
const { Unauthorized } = require("../errors/unauthorized");

const { NODE_ENV, JWT_SECRET } = process.env;

const signUp = async (req, res, next) => {
  const { email, password, name } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const query = {
    Email: email,
    Password: hash,
    Name: name,
    ID: nanoid(10),
    RegDate: moment().format(),
  };

  sequelize
    .sync()
    .then(async () => {
      const dbQuery = await Profiles.create(query)
        .then((sqlRes) => {
          return res
            .status(200)
            .send(requiredValues([sqlRes.dataValues], reqValues));
        })
        .catch((error) => {
          if (error.original.code === "ER_DUP_ENTRY") {
            return next(new Conflict("User already exist"));
          }
          return next(error);
        });
    })
    .catch((error) => {
      return next(error);
    });
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Unauthorized("Unauthorized"));
  }
  sequelize
    .sync()
    .then(async () => {
      const dbQuery = await Profiles.findOne({
        where: {
          Email: email,
        },
      })
        .then((sqlRes) => {
          return sqlRes.dataValues;
        })
        .catch((error) => {
          return next(error);
        });
      const { Password: hash, ID } = dbQuery;
      bcrypt.compare(password, hash, (err, match) => {
        if (!match) {
          return next(new Unauthorized("Unauthorized"));
        }
        const token = jwt.sign(
          { ID: ID },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" }
        );
        res.status(200).send({ token });
      });
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
};

module.exports = {
  signUp,
  signIn,
};
