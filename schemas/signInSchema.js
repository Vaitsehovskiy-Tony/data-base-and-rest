const { Joi } = require('celebrate');

module.exports.signInSchema = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .lowercase()
      .email({ minDomainSegments: 2 }),
    password: Joi.string()
      .alphanum()
      .required()
      .min(6),
  }),
};
