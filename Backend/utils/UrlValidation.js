const validator = require('validator');
const ValidationError = require('../errors/ValidationError');

const UrlValidation = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new ValidationError('Нужно передать URL ссылку');
};

module.exports = UrlValidation;
