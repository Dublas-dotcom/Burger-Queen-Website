/*
  auth.js - Express routes for authentication in Burger Queen backend
  Endpoints: /register, /login, /logout, /session
*/

const express = require('express'); // Express framework
const router = express.Router(); // Router instance
const authController = require('../controllers/authController'); // Auth logic

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authController.login);

// @route   POST /api/auth/logout
// @desc    Logout user (clear cookie)
// @access  Public
router.post('/logout', authController.logout);

// @route   GET /api/auth/session
// @desc    Check if user session is valid (persistent login)
// @access  Public
router.get('/session', authController.checkSession);

/*
Example usage:
POST /api/auth/register { email, password }
POST /api/auth/login { email, password }
POST /api/auth/logout
GET  /api/auth/session
*/

module.exports = router; 