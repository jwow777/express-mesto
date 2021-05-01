const router = require('express').Router();
const { cardValid, idValid } = require('../middlewares/validation');
const {
  getCards, createCard, deleteCard, putCardLike, deleteCardLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', cardValid, createCard);
router.delete('/:cardId', idValid, deleteCard);
router.put('/:cardId/likes', putCardLike);
router.delete('/:cardId/likes', deleteCardLike);

module.exports = router;
