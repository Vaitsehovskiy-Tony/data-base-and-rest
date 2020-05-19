const routerCards = require('express').Router();
const { createCard, getCards, cardRemove } = require('../controllers/cards');

routerCards.delete('/:id', cardRemove);
routerCards.get('/', getCards);
routerCards.post('/', createCard);

module.exports = routerCards;
