const router = require('express').Router();
const { idValid, userInfoValid, userAvatarValid } = require('../middlewares/validation');
const {
  getUsers, getUserById, updateUser, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', idValid, getUserById);
router.patch('/me', userInfoValid, updateUser);
router.patch('/me/avatar', userAvatarValid, updateUserAvatar);

module.exports = router;
