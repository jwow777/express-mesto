const router = require('express').Router();
const { userInfoValid, idValid } = require('../middlewares/validation');
const {
  getUsers, getUserById, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', idValid, getUserById);
router.patch('/me', userInfoValid, updateUser);
router.patch('/me/avatar', userInfoValid, updateUserAvatar);

module.exports = router;
