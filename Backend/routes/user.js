const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getOneUser, updateUser, updateAvatar, getUserById,
} = require('../controllers/user');
const auth = require('../middlewares/auth');
const UrlValidation = require('../utils/UrlValidation');

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getOneUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({ // Валидация параметра
    userId: Joi.string().hex().length(24),
  }),
}), auth, getUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({ // Валидация тела
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), auth, updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({ // Валидация тела
    avatar: Joi.string().required().custom(UrlValidation),
  }),
}), auth, updateAvatar);

module.exports = router;
