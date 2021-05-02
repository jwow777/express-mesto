const router = require('express').Router();
const { cardValid, idValid } = require('../middlewares/validation');
const {
  getCards, createCard, deleteCard, putCardLike, deleteCardLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', cardValid, createCard);
router.delete('/:id', idValid, deleteCard);
router.put('/:id/likes', idValid, putCardLike);
router.delete('/:id/likes', idValid, deleteCardLike);

module.exports = router;
