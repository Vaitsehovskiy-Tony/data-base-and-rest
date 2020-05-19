const cardModel = require('../models/card');

const cardRemove = (req, res) => {
  cardModel.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

const getCards = (req, res) => {
  cardModel.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  cardModel.create({ name, link })
    .then((oneCard) => res.send(oneCard))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports = {
  createCard,
  getCards,
  cardRemove,
};
