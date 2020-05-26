const cardModel = require('../models/card');

const cardRemove = (req, res) => {
  cardModel.findById(req.params.id)
    .then((card) => {
      const { owner } = card;
      return owner;
    })
    // eslint-disable-next-line consistent-return
    .then((owner) => {
      const a = JSON.stringify(owner).slice(1, -1);
      if (a !== req.user._id) {
        return Promise.reject(new Error('Недостаточно прав для удаления карточки'));
      }
      cardModel.findByIdAndRemove(req.params.id)
        .then((card) => {
          if (card) {
            res.send({ data: card });
          } else {
            res.status(404).send({ message: 'Нет карточки с таким id' });
          }
        })
        .catch((err) => res.status(400).send({ message: err.message }));
    })
    .catch((err) => res.status(400).send({ message: err.message }));
};

const getCards = (req, res) => {
  cardModel.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
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
