/*
  authController.js - Handles authentication logic for Burger Queen backend
  Functions: register, login, logout, checkSession
*/

const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For JWT token creation
const User = require('../models/User'); // User model

/**
 * Registers a new user.
 * @param {Object} req - Express request object (expects email, password in body)
 * @param {Object} res - Express response object
 * @returns {Object} JSON with user info and JWT token
 */
exports.register = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = new User({ email, password: hashedPassword });
    await user.save();
    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Set token in HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    // Respond with user info (excluding password)
    res.status(201).json({ user: { id: user._id, email: user.email, isAdmin: user.isAdmin }, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Logs in a user.
 * @param {Object} req - Express request object (expects email, password in body)
 * @param {Object} res - Express response object
 * @returns {Object} JSON with user info and JWT token
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.json({ user: { id: user._id, email: user.email, isAdmin: user.isAdmin }, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Logs out a user by clearing the token cookie.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON with logout message
 */
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

/**
 * Checks if the user session is valid (persistent login).
 * @param {Object} req - Express request object (expects token in cookies)
 * @param {Object} res - Express response object
 * @returns {Object} JSON with user info if valid
 */
exports.checkSession = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No token' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/*
Example usage:
POST /api/auth/register { email, password }
POST /api/auth/login { email, password }
POST /api/auth/logout
GET  /api/auth/session
*/ 