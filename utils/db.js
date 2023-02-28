const {
  DB_URL_MODE,
  DB_NAME_MODE,
  DB_NAME,
  DB_LOGIN_MODE,
  DB_PASSWORD_MODE,
  DB_TABLE_MODE,
} = require("../utils/config");
const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");

const db = mysql.createPool({
  host: DB_URL_MODE,
  user: DB_LOGIN_MODE,
  password: DB_PASSWORD_MODE,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

const sequelize = new Sequelize(DB_NAME_MODE, DB_LOGIN_MODE, DB_PASSWORD_MODE, {
  host: DB_URL_MODE,
  dialect: "mysql",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

const Profiles = sequelize.define(DB_TABLE_MODE, {
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const createSheme = `CREATE SCHEMA IF NOT EXISTS ${DB_NAME_MODE} ;`;
const useSheme = `USE ${DB_NAME_MODE} ;`;

db.getConnection((err, connection) => {
  console.log(err);
  if (err) {
    console.log(err);
  }
  [createSheme, useSheme].forEach((queryString) => {
    connection.query(queryString, function (err, data) {
      if (err) {
        console.log(err);
      }
      connection.release();
    });
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully");
    })
    .catch((error) => {
      console.error("Unable to connect to the database");
    });
  sequelize
    .sync()
    .then(() => {
      console.log("Table created successfully");
    })
    .catch((error) => {
      console.error("Unable to create table");
    });
});

module.exports = { db, sequelize, Profiles };
