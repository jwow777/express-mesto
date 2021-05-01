const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длинна 2 символа'],
    maxlength: [30, 'Максимальная длинна 30 символов'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /(https?):\/\/\w*\S*\./.test(url);
      },
      message: 'Неправильный формат адреса',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,

  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
