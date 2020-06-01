const routerUsers = require('express').Router();
const { getUsers, findUser } = require('../controllers/users');
const { requestLogger, errorLogger } = require('../middlewares/logger');

routerUsers.use(requestLogger);


routerUsers.get('/', getUsers);
routerUsers.get('/:id', findUser);

routerUsers.use(errorLogger);

module.exports = routerUsers;
