const routerCards = require('express').Router();
const { createCard, getCards, cardRemove } = require('../controllers/cards');

const { requestLogger, errorLogger } = require('../middlewares/logger');

routerCards.use(requestLogger);

routerCards.delete('/:id', cardRemove);
routerCards.get('/', getCards);
routerCards.post('/', createCard);

routerCards.use(errorLogger);

module.exports = routerCards;
