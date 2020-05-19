const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Должно быть от 2 до 30 символов'],
    maxlength: [30, 'Должно быть от 2 до 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Это обязательное поле'],
    validate: {
      validator(v) {
        return /(http:\/\/|https:\/\/)((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|((www\.)?[\w.]+\.[a-zа-яA-ZА-Я]+))(:\d*)?[\w/.]*#?/.test(v);
      },
      message: 'Здесь должна быть ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [false, 'Это обязательное поле'],
    ref: 'user',

  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    required: [false, 'Это обязательное поле'],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    required: [true, 'Это обязательное поле'],
    default: Date.now,

  },
});

module.exports = mongoose.model('card', cardSchema);
