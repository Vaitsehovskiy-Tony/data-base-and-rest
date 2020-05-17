const routerUsers = require('express').Router();
const users = require('../data/users.json');

routerUsers.get('/', (req, res) => {
  res.send(users);
});

const doesUserExist = (req, res) => {
  // eslint-disable-next-line arrow-parens
  const foundUser = users.find(userItem => userItem._id === req.params.id);
  if (foundUser) {
    res.status(200).send(foundUser);
    return;
  }
  res.status(404).send({ message: 'Нет пользователя с таким id' });
};

routerUsers.get('/:id', doesUserExist);

module.exports = routerUsers;
