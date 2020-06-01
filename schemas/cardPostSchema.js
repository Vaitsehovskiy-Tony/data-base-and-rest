const Joi = require('celebrate');

module.exports.cardPostSchema = {
  body: Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .required()
      .min(2)
      .max(30),
    link: Joi.string()
      .regex(/(https?:\/\/)(www\.)?((\w+\.\w{2,})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?.*#?/i)
      .required(),
  }),
};
