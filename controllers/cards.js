const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');
const Forbidden = require('../errors/forbidden-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .select('-__v')
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      throw new BadRequestError(err.message);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .select('-__v')
    .orFail(new Error('Запрашиваемая карточка не найдена'))
    .then((data) => {
      if (data.owner.toString() !== req.user._id) {
        throw new Forbidden('Вы не можете удалить чужую карточку.');
      }
      Card.findByIdAndRemove(req.params.id)
        .then((card) => res.status(200).send(card))
        .catch(next);
    })
    .catch((err) => {
      throw new NotFoundError(err.message);
    })
    .catch(next);
};

module.exports.putCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('Запрашиваемая карточка не найдена'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      throw new NotFoundError(err.message);
    })
    .catch(next);
};

module.exports.deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('Запрашиваемая карточка не найдена'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      throw new NotFoundError(err.message);
    })
    .catch(next);
};
