const usersRouter = require('express').Router();
const {signinValidation, signupValidation} = require('../utils/validation');

const {
  signIn, signUp
} = require('../controllers/user');

usersRouter.post('/register',
  signupValidation, signUp
);

usersRouter.post('/login',
  signinValidation, signIn
);

module.exports = usersRouter;
