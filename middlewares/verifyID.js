const { Unauthorized } = require('../errors/unauthorized');

const verifyID = (req, res, next) => {
  if (req.user.ID !== req.params.id) {
    return next (new Unauthorized('Неавторизовано'));
  }
  next();
};

module.exports = { verifyID };
