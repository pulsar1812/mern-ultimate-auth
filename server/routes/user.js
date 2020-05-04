const express = require('express');

const { getUser, updateUser } = require('../controllers/user');
const { requireSignin, adminMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.get('/:id', requireSignin, getUser);
router.put('/', requireSignin, adminMiddleware, updateUser);

module.exports = router;
