const cardModel = require('../models/card');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

const cardRemove = (req, res, next) => {
  cardModel.findById(req.params.id)
    .then((card) => {
      const { owner } = card;
      return owner;
    })
    // eslint-disable-next-line consistent-return
    .then((owner) => {
      const a = JSON.stringify(owner).slice(1, -1);
      if (a !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      cardModel.findByIdAndRemove(req.params.id)
        .then((card) => {
          if (card) {
            res.send({ data: card });
          } else {
            throw new NotFoundError('Нет карточки с таким id');
          }
        })
        .catch(next);
    })
    .catch(next);
};

const getCards = (req, res, next) => {
  cardModel.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
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
