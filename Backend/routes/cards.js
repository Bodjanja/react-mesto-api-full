const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, addCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const UrlValidation = require('../utils/UrlValidation');

router.get('/cards', auth, getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({ // Валидация тела
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(UrlValidation),
  }),
}), auth, addCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({ // Валидация параметра
    cardId: Joi.string().hex().length(24),
  }),
}), auth, deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({ // Валидация параметра
    cardId: Joi.string().hex().length(24),
  }),
}), auth, likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({ // Валидация параметра
    cardId: Joi.string().hex().length(24),
  }),
}), auth, dislikeCard);

module.exports = router;
