const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const authError = (res) => {
  res
    .status(401)
    .send({ message: 'Тербуется авторизация' });
};
const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return authError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET || 'dev-key');
  } catch (err) {
    return authError(res);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
