const routerUsers = require('express').Router();
const { getUsers, createUser, findUser } = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.post('/', createUser);
routerUsers.get('/:id', findUser);

module.exports = routerUsers;
