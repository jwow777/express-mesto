const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({}, { __v: 0 })
    .then((users) => res.send({ users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(err.message);
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId, { __v: 0 })
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(err.message);
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(err.message);
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(err.message);
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
