const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const Users = require('../models/user');

const { JWT_SECRET } = process.env;


const getUsers = (req, res) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// eslint-disable-next-line consistent-return
const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (validator.isAlphanumeric(password, ['en-US'])) {
    bcrypt.hash(password, 10)
      .then((hash) => Users.create({
        name, about, avatar, email, password: hash,
      }))
      .then((user) => {
        const userNoPass = user;
        userNoPass.password = '******';
        // delete userNoPass.password;
        res.send({ data: userNoPass });
      })
      .catch((err) => res.status(404).send({ message: err.message }));
  } else {
    return res.status(400).send('недопустимые символы в пароле, используйте латиницу');
  }
};


const findUser = (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch((err) => res.status(404).send({ message: err.message }));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let user;

  Users.findOne({ email }).select('+password')
    .then((u) => {
      user = u;
      if (!u) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, u.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return jwt.sign(
        { _id: user.id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
    })
    .then((token) => {
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.json({ token });
    })
    .catch(next);
};

module.exports = {
  createUser,
  findUser,
  getUsers,
  login,
};
