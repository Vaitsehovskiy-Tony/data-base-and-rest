const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const Users = require('../models/user');

const { NODE_ENV, JWT_SECRET } = require('../config');

const getUsers = (req, res, next) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const createUser = (req, res, next) => {
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
        res.send({ data: userNoPass });
      })
      .catch(next);
  } else {
    throw new BadRequestError('недопустимые символы в пароле, используйте латиницу')
      .catch(next);
  }
};


const findUser = (req, res, next) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Нет пользователя с таким id');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let user;

  Users.findOne({ email }).select('+password')
    .then((u) => {
      user = u;
      if (!u) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, u.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return jwt.sign(
        { _id: user.id },
        NODE_ENV === 'prod' ? JWT_SECRET : 'JWT_SECRET',
        { expiresIn: '7d' },
      );
    })
    .then((token) => {
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
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
