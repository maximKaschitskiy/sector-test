const { celebrate, Joi } = require('celebrate');
const { validateGender } = require('../utils/validTests');

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(30),
  }),
})

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
})

const editUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
    surname: Joi.string().min(2).max(30),
    gender: Joi.string().custom((value) => {
      if (!validateGender(value)) {
        throw new Error('Invalid gender');
      }
      return value;
    }),
  }),
})

module.exports = { signinValidation, signupValidation, editUserValidation }