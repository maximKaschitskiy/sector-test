require("dotenv").config();
const express = require("express");
const app = express();
const { db } = require("./utils/db");
const { PORT, NODE_ENV, DB_URL_MODE } = require("./utils/config");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const usersRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const profilesRouter = require("./routes/profiles");
const auth = require("./middlewares/auth");
const errorMiddleware = require("./middlewares/errorMiddleware");
const { NotFound } = require("./errors/notFound");
const corsMiddleware = require("./middlewares/corsMiddleware");

app.listen(PORT, () => {
  console.log(`Server was runned. Port: ${PORT}. Mode: ${NODE_ENV}. DB: ${DB_URL_MODE}`);
});

app.use("/uploads", express.static("uploads"));

app.use(corsMiddleware);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", usersRouter);
app.use("/profile", auth, profileRouter);
app.use("/profiles", auth, profilesRouter);

app.use(errors());

app.use((req, res, next) => {
  return next(new NotFound("Not found"));
});

app.use(errorMiddleware);
