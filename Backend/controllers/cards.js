const Card = require('../models/card');
const {
  STATUS_OK, STATUS_CREATED, NOT_AUTHORIZED,
} = require('../utils/statuses');
const ValidationError = require('../errors/ValidationError');
const CastError = require('../errors/CastError');
const NotFoundInBase = require('../errors/NotFoundInBaseError');
const WrongUser = require('../errors/WrongUser');

module.exports.getCards = (req, res, next) => {
  Card.find({ })
    .then((cards) => res.status(STATUS_OK).send({ data: cards }))
    .catch(next);
};

module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  // eslint-disable-next-line max-len
  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CREATED).send({ data: card }))
    .catch((err) =>
    // eslint-disable-next-line brace-style
    {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные в методы создания карточки'));
      } else { next(err); }
    });
};

module.exports.deleteCard = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  Card.findById(req.params.cardId)
    .orFail(new Error('NotFoundInBase'))
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return Card.findByIdAndRemove(req.params.cardId)
          .then(() => {
            res.status(STATUS_OK).send({ message: 'Карточка удалена' });
          });
      } return next(WrongUser('Не ваша карточка'));
    })
    .catch((err) => {
      if (err.message === 'NotFoundInBase') {
        next(new NotFoundInBase('Карточки нет в базе данных'));
      } else if (err.name === 'CastError') {
        next(new CastError('Некорректный ID карточки'));
      } else { next(err); }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('NotFoundInBase'))
    .then((card) => {
      res.status(STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректный ID карточки'));
      } else if (err.message === 'NotFoundInBase') {
        next(new NotFoundInBase('Карточки нет в базе данных'));
      } else { next(err); }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('NotFoundInBase'))
    .then((likes) => res.status(STATUS_OK).send({ data: likes }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректный ID карточки'));
      } else if (err.message === 'NotFoundInBase') {
        next(new NotFoundInBase('Карточки нет в базе данных'));
      } else { next(err); }
    });
};
