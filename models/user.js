// const validator = require('validator');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');

const userSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .required()
    .min(2)
    .max(30),
  about: Joi.string()
    .string()
    .required()
    .min(2)
    .max(30),
  avatar: Joi.string()
    .string()
    .required(),
  email: Joi.string()
    .string()
    .required()
    .unique(true)
    .email({ minDomainSegments: 2 }),
  password: Joi.string()
    .string()
    .required()
    .select(false),
});

module.exports = mongoose.model('user', userSchema);

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Это обязательное поле'],
//     minlength: [2, 'Должно быть от 2 до 30 символов'],
//     maxlength: [30, 'Должно быть от 2 до 30 символов'],
//   },
//   about: {
//     type: String,
//     required: [true, 'Это обязательное поле'],
//     minlength: [2, 'Должно быть от 2 до 30 символов'],
//     maxlength: [30, 'Должно быть от 2 до 30 символов'],
//   },
//   avatar: {
//     type: String,
//     required: [true, 'Это обязательное поле'],
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator(v) { return validator.isEmail(v); },
//       message: 'Неверный формат почты',
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     select: false, // необходимо добавить поле select
//   },
// });
