const cardModel = require('../models/card');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');


const cardRemove = (req, res, next) => {
  cardModel.findById(req.params.id)
    .then((card) => {
      const { owner } = card;
      if (owner === 'null') {
        throw new BadRequestError('недопустимые символы, используйте латиницу');
      }
      return owner;
    })
    // eslint-disable-next-line consistent-return
    .then((owner) => {
      if (req.user._id !== owner.toSrting()) {
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

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardModel.create({ name, link })
    .then((oneCard) => res.send(oneCard))
    .catch(next);
};

module.exports = {
  createCard,
  getCards,
  cardRemove,
};
