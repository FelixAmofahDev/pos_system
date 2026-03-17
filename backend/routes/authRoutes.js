const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Login
router.post('/login', AuthController.login);

// Register (protected - would need admin middleware in production)
router.post('/register', AuthController.register);

// Change password
router.post('/change-password', verifyToken, AuthController.changePassword);

module.exports = router;
