const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../utils/auth');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/profile', auth.authenticateToken, UserController.getUserProfile);

module.exports = router;
