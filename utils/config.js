const {
  PORT = 3001,
  NODE_ENV,
  JWT_SECRET,
  DB_LOGIN_LOCAL,
  DB_PASSWORD_LOCAL,
  DB_LOGIN,
  DB_PASSWORD,
  DB_NAME,
  DB_NAME_LOCAL,
  DB_TABLE,
  DB_URL,
  DB_URL_LOCAL
} = process.env;

const JWT_MODE = NODE_ENV === "production" ? JWT_SECRET : "dev-secret";
const DB_URL_MODE = NODE_ENV === "production" ? DB_URL : DB_URL_LOCAL;
const DB_NAME_MODE = NODE_ENV === "production" ? DB_NAME : DB_NAME_LOCAL;
const DB_TABLE_MODE = DB_TABLE;
const DB_LOGIN_MODE = NODE_ENV === "production" ? DB_LOGIN : DB_LOGIN_LOCAL;
const DB_PASSWORD_MODE = NODE_ENV === "production" ? DB_PASSWORD : DB_PASSWORD_LOCAL;

module.exports = {
  PORT,
  JWT_MODE,
  NODE_ENV,
  DB_URL_MODE,
  DB_NAME_MODE,
  DB_LOGIN_MODE,
  DB_PASSWORD_MODE,
  DB_TABLE_MODE,
};
