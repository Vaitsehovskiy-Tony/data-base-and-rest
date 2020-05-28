/* eslint-disable no-useless-escape */
const { Joi } = require('celebrate');

module.exports.signInSchema = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .lowercase()
      .email({ minDomainSegments: 2 }),
    password: Joi.string()
      .regex(/^[-_!@#%{}a-zA-Z0-9\]\[\\\?\^\$\.\|\*\+\)\(]{8,30}$/)
      .required()
      .min(6),
  }),
};
