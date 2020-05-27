const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    const SECRET = NODE_ENV === 'prod' ? JWT_SECRET : 'JWT_SECRET';
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    throw new UnauthorizedError('Требуется авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
