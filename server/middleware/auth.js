/*
  auth.js - Middleware for JWT authentication in Burger Queen backend
  Protects routes by verifying JWT token
*/

const jwt = require('jsonwebtoken'); // For JWT verification
const User = require('../models/User'); // User model

/**
 * Middleware to authenticate user using JWT from cookies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
const auth = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user to request
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth; 