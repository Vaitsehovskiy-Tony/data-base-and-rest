const { Joi } = require('celebrate');

module.exports.signUpSchema = {
  body: Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .required()
      .min(2)
      .max(30),
    about: Joi.string()
      .required()
      .min(2)
      .max(30),
    avatar: Joi.string()
      .required(),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2 }),
    password: Joi.string()
      .regex(/\S/)
      .required()
      .min(6),
  }).unknown(true),
};
