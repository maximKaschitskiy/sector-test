const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  if (err.statusCode) {
    return res.status(err.statusCode).send({
      message: err.message
    });
  } else {
    return res.status(500).send({
      message: 'Internal Error'
    });
  }
  next();
};

module.exports = errorMiddleware;
