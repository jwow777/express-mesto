const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.idValid = celebrate({
  params: Joi
    .object()
    .keys({
      id: Joi.string().hex().length(24),
    }),
});

module.exports.cardValid = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().min(2).max(256)
        .custom((value, helpers) => {
          if (validator.isURL(value, { require_protocol: true, disallow_auth: true })) {
            return value;
          }
          return helpers.message('Неправильный формат ссылки');
        }),
    }),
});

module.exports.registrValid = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true, disallow_auth: true })) {
          return value;
        }
        return helpers.message('Неправильный формат ссылки');
      }),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
});

module.exports.loginValid = celebrate({
  body: Joi
    .object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
});

module.exports.userInfoValid = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
});

module.exports.userAvatarValid = celebrate({
  body: Joi
    .object()
    .keys({
      avatar: Joi.string().required()
        .custom((value, helpers) => {
          if (validator.isURL(value, { require_protocol: true, disallow_auth: true })) {
            return value;
          }
          return helpers.message('Неправильный формат ссылки');
        }),
    }),
});
