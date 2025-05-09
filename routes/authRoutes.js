 // routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);  // POST route for registration
router.post('/login', login);        // POST route for login

module.exports = router;
